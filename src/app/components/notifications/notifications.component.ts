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

  public toggleval: boolean;
  public timesel: number;
  public events: any;
  public notifs = [];

  constructor(public navCtrl: NavController, private plt: Platform, private localNotification: LocalNotifications,
    private alertCtrl: AlertController, private http: HttpClient, private storage: Storage) {
      this.translatePage();
    console.log(this.timesel)
    storage.ready().then(() => {
      // get a key/value pair
      storage.get('toggleval').then((val) => {
        if (val == undefined) {
          this.toggleval = false;
          storage.set('toggleval', false);
        } else if (val == true) {
          storage.get('timesel').then((ts) => {
            this.timesel = ts;
          });
          this.toggleval = val;
        }

      })

    });


    this.plt.ready().then(() => {
      this.localNotification.on('trigger').subscribe(res => {
        console.log('trigger: ', res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);


      });
    });
  }

  showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }
  Clicked() {
    debugger;
    console.log(this.toggleval);
    this.storage.set('toggleval', this.toggleval)

    if (this.toggleval == false) {
      this.timesel = null;
      this.storage.set('timesel', null);
    }

  }
  onChange(timesel) {
    this.storage.set('timesel', timesel)
    this.timesel = timesel;
    this.refreshEvents()
    console.log(this.timesel);
  }

  refreshEvents() {
    this.http.get('http://concordiagocalendar.herokuapp.com/getNextEvents').subscribe(data => {

      this.events = data;

      for (let i = (this.events.length - 1); i >= 0; i--) {

        let eventDate = Date.parse(this.events[i].start.dateTime);
        let todayDate = new Date().getTime();
        console.log('You have this event after ' + this.timesel + ' minutes')
        console.log(eventDate);
        console.log(todayDate);
        console.log(eventDate / 1000 - todayDate / 1000 - this.timesel * 60)
        var eventTrigger = eventDate / 1000 - todayDate / 1000 - this.timesel * 60;
        if (eventTrigger <= 0) {
          eventTrigger = 1;
        }

        let notif = {
          id: i,
          title: this.events[i].summary,
          text: 'You have an upcoming event in ' + this.timesel + ' minutes',
          trigger: {
            in: eventTrigger,
            unit: ELocalNotificationTriggerUnit.SECOND
          },
          vibrate: true,
          foreground: true
        }

        this.notifs.push(notif);

      }

      this.localNotification.schedule(this.notifs);

    });
  }

  ngOnInit() {this.translatePage()}
  async translatePage()
  {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    this.storage.ready().then(() => {

      this.storage.get('languagePreference').then((lP) => {

      // If no setting has been set, default is english
      if(lP == null)
      {
        lP = 'English';
        this.storage.set('languagePreference', 'English');

      }
      if(lP === 'English')
      {
        document.getElementById('toggle').innerHTML = json.english.notifications.toggle;
        
        if(this.toggleval){
          document.getElementById('options').innerHTML = json.english.notifications.options;
          document.getElementsByName('select')[0].setAttribute('placeholder', json.english.notifications.select);
        }
      }
      else if(lP === 'French')
      {
        document.getElementById('toggle').innerHTML = json.french.notifications.toggle;
        
        if(this.toggleval){
          document.getElementById('options').innerHTML = json.french.notifications.options;
          document.getElementsByName('select')[0].setAttribute('placeholder', json.french.notifications.select);
        }
      }

     
      });
    });
  }

}
