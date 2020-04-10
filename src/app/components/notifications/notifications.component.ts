import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
toggleval:boolean=false;
timesel:number;

  constructor(private plt:Platform,private localNotification:LocalNotifications,
    private alertCtrl: AlertController ) {
      this.plt.ready().then(()=> {
        this.localNotification.on('trigger').subscribe(res => {
          console.log('trigger: ',res);
          let msg=res.data ? res.data.mydata : '';
          this.showAlert(res.title,res.text,msg)

        });
        this.localNotification.on('click').subscribe(res => {

        });
      });
   }
   scheduleNotif(){
     if(this.toggleval){
     this.localNotification.schedule({
       id:1,
       title: 'Attention ',
       text: 'Notifications are enabled',
       trigger: { in:3, unit: ELocalNotificationTriggerUnit.SECOND  }

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
     this.scheduleNotif();
   }
   onChange(value){
    this.timesel=value;
    console.log(this.timesel);
  }
  ngOnInit() {}
  
}
