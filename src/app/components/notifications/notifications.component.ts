import { AlertController, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import {Storage} from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
toggleval:boolean;
timesel:number;
events:any;


  constructor(public navCtrl: NavController,private plt:Platform,private localNotification:LocalNotifications,
    private alertCtrl: AlertController, private http:HttpClient, private storage:Storage) {
      console.log(this.timesel)
      storage.ready().then(() => {
        // get a key/value pair
         storage.get('toggleval').then((val) => {
         this.toggleval=val;
         console.log('Status = ', val)
         })
         storage.get('timesel').then((v) => {     
          this.storage.set('timesel',15);
            this.timesel=v;
          console.log('timeselected = ',v)});
        });  

        this.http.get('http://concordiagocalendar.herokuapp.com/getNextEvents').subscribe(data => {
        
          this.events = data;
        
        });
     

      this.plt.ready().then(()=> {
        this.localNotification.on('trigger').subscribe(res => {
          console.log('trigger: ',res);
          let msg=res.data ? res.data.mydata : '';
          this.showAlert(res.title,res.text,msg);
          
          
        });
      });

     

   }
   
   showAlert(header,sub,msg){
     this.alertCtrl.create({
       header:header,
       subHeader:sub,
       message:msg,
       buttons:['Ok']
     }).then(alert=>alert.present());
   }
   Clicked(){
    this.storage.set('toggleval',this.toggleval)
   }
   onChange(value){
    this.storage.set('timesel',value)
    this.refreshEvents()
    console.log(this.timesel);
  }

  refreshEvents()
  {
    this.http.get('http://concordiagocalendar.herokuapp.com/getNextEvents').subscribe(data => {
        
      this.events = data;

      for(let i = 0; i < this.events.length; i++)
      {

        let eventDate = Date.parse(this.events[i].start.dateTime);
        let todayDate = new Date().getTime();
        console.log('You have this event after ' + this.timesel +' minutes')
        console.log(eventDate);
        console.log(todayDate);
        console.log(eventDate/1000 - todayDate/1000 - this.timesel*60)


        this.localNotification.schedule({
          
          title: this.events[i].summary,
          text: 'You have this event after ' + this.timesel +' minutes',
          trigger: { in: (eventDate/1000 - todayDate/1000 - this.timesel*60), unit: ELocalNotificationTriggerUnit.SECOND },
          vibrate:true,
          foreground:true
        });
      }
        
    });
  }

  ngOnInit() {}
  
}
