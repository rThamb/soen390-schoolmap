import { Component, OnInit } from '@angular/core';
import { authorizeAndGetEvents } from '../../../assets/calendar';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  public events;
  public email: string;
  public today;

  constru;
  private http: any;
  private storage: any;
  private navCtrl: any;
  a: string;
  ctor(http: HttpClient, storage: Storage, navCtrl: NavController) {
    this.today = Date.now();
    this.getNextEvents();
    this.translatePage();
  }

  ngOnInit() {

  }
  setEvent(a) {
    this.events = a;
  }
  /**
   * Sends a request to the websever for retrieving upcoming calendar events from the gmail account
   */
  getNextEvents() {
  this.http.get('http://concordiagocalendar.herokuapp.com/getNextEvents').subscribe(data => {
  console.log(data);

  if (data) {
        console.log(data);
        this.events = data;
        this.email = this.events[0].creator.email;

        this.storage.ready().then(() => {
          this.storage.set('events', this.events);
        });

        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].start.dateTime || this.events[i].end.dateTime) {

          }

        }

      } else {
        console.log('No events available');
      }

    });
  }

  /**
   * When user clicks on an event, redirects them to the New Route page with the event's location set as the destination.
   * @param location
   */
  goToEventLocation(location) {
    this.storage.ready().then(() => {
      this.storage.set('newRouteDest', location);
    });

    this.navCtrl.navigateRoot('/NewRoute');

    console.log(location);

  }

  async translatePage() {
    const res = await fetch('./assets/Languages/language.json');
    const json = await res.json();

    // check if language is english with storage
    this.storage.ready().then(() => {

      this.storage.get('languagePreference').then((lP) => {

      // If no setting has been set, default is english
      if (lP == null) {
        lP = 'English';
        this.storage.set('languagePreference', 'English');
      }
      if ( lP === 'English') {
        document.getElementById('email').innerHTML = json.english.schedule.email;
        document.getElementById('date').innerHTML = json.english.schedule.date;
        document.getElementById('upcoming').innerHTML = json.english.schedule.event;
        for (let i = 0; i < document.getElementsByClassName('eventStart').length; i++) {
          document.getElementsByClassName('eventStart')[i].innerHTML = json.english.schedule.start;
        }
        for (let i = 0; i < document.getElementsByClassName('eventEnd').length; i++) {
          document.getElementsByClassName('eventEnd')[i].innerHTML = json.english.schedule.end;
        }
      } else if (lP === 'French') {
        document.getElementById('email').innerHTML = json.french.schedule.email;
        document.getElementById('date').innerHTML = json.french.schedule.date;
        document.getElementById('upcoming').innerHTML = json.french.schedule.event;
        console.log(document.getElementsByClassName('eventStart').length);
        const len = document.getElementsByClassName('eventStart');
        console.log(len.length);
        for (let i = 0; i < document.getElementsByClassName('eventStart').length; i++) {
          document.getElementsByClassName('eventStart')[i].innerHTML = json.french.schedule.start;
        }
        for (let i = 0; i < document.getElementsByClassName('eventEnd').length; i++) {
          document.getElementsByClassName('eventEnd')[i].innerHTML = json.french.schedule.end;
        }
      }

    });

    });
  }

}
