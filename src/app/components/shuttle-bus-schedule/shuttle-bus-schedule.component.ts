import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import data from '../../../assets/Shuttlebussched/schedule.json';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-shuttle-bus-schedule',
  templateUrl: './shuttle-bus-schedule.component.html',
  styleUrls: ['./shuttle-bus-schedule.component.scss'],
})
export class ShuttleBusScheduleComponent implements OnInit {

tableStyle = 'bootstrap';

  private loyola = 'Departure from Loyola';


  constructor(private storage: Storage) {
    this.translatePage();
  }
  arro = data.monday;
  arr1 = data.friday;

  ngOnInit() {

  }
  changeStyle() {
    if (this.tableStyle === 'bootstrap') {
    this.tableStyle = 'dark';
    } else if (this.tableStyle === 'dark') {
    this.tableStyle = 'bootstrap';
 }

  }

  async translatePage() {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    this.storage.ready().then(() => {

      this.storage.get('languagePreference').then((lP) => {

      // If no setting has been set, default is english
      if (lP == null) {
        lP = 'English';
        this.storage.set('languagePreference', 'English');
      }

      if (lP === 'English') {
        document.getElementById('departure').innerHTML = json.english.shuttle.departure;
        document.getElementById('textMonToThur').innerHTML = json.english.shuttle.monToThur;
        document.getElementById('textFriday').innerHTML = json.english.shuttle.friday;
      } else if (lP === 'French') {
        document.getElementById('departure').innerHTML = json.french.shuttle.departure;
        document.getElementById('textMonToThur').innerHTML = json.french.shuttle.monToThur;
        document.getElementById('textFriday').innerHTML = json.french.shuttle.friday;
      }

      });
    });
  }


}
