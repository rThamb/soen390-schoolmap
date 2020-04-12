import { AlertController } from '@ionic/angular';
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


  constructor(private plt:Platform,private localNotification:LocalNotifications,
    private alertCtrl: AlertController, private http:HttpClient) {

        this.http.get('http://concordiagocalendar.herokuapp.com/getNextEvents').subscribe(data => {
        
          this.events = data;
        
        });
      console.log(this.events);

      this.plt.ready().then(()=> {
        this.localNotification.on('trigger').subscribe(res => {
          console.log('trigger: ',res);
          let msg=res.data ? res.data.mydata : '';
          this.showAlert(res.title,res.text,msg);
          
          
        });
      });


   }
   scheduleNotif(){

     if(this.toggleval){
     this.localNotification.schedule({
       id:1,
       title: 'Attention ',
       text: 'Notifications are enabled',
       trigger: { in: this.timesel, unit: ELocalNotificationTriggerUnit.SECOND  }
     })};
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
     this.toggleval=!this.toggleval;
     if(this.toggleval)
     {this.onChange(15);}
   }
   onChange(value){
    this.timesel=value;
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

        console.log(eventDate);
        console.log(todayDate);
        var eventTrigger = (eventDate/1000 - todayDate/1000 - this.timesel*60);
        if(eventTrigger<=0)
        {
          eventTrigger = 1;
        }
        console.log(eventTrigger);
        this.localNotification.schedule({
          id:1,
          title: this.events[i].summary,
          text: this.events[i].description,
          trigger: { in: (eventTrigger), unit: ELocalNotificationTriggerUnit.SECOND }
        });
      }
        
    });
  }

  ngOnInit() {}
  
}
