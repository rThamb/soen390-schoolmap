import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import data from '../../../assets/Shuttlebussched/schedule.json';
<<<<<<< HEAD
import {Storage} from '@ionic/storage'
=======
import {Storage} from '@ionic/storage';

>>>>>>> ccf754dfdcb03e7ff6c22fed2990d1de641b8c40
@Component({
  selector: 'app-shuttle-bus-schedule',
  templateUrl: './shuttle-bus-schedule.component.html',
  styleUrls: ['./shuttle-bus-schedule.component.scss'],
})
export class ShuttleBusScheduleComponent implements OnInit {
<<<<<<< HEAD

  tableStyle = 'bootstrap';
=======
>>>>>>> ccf754dfdcb03e7ff6c22fed2990d1de641b8c40

tableStyle = 'bootstrap';

  private loyola = 'Departure from Loyola';

<<<<<<< HEAD
  constructor(private storage: Storage) {
    debugger;
=======

  constructor(private storage: Storage) {
>>>>>>> ccf754dfdcb03e7ff6c22fed2990d1de641b8c40
    this.translatePage();
  }
  arro = data.monday;
  arr1 = data.friday;

  ngOnInit() {

  }
  changeStyle() {
<<<<<<< HEAD
    if (this.tableStyle == 'bootstrap')
      this.tableStyle = 'dark';
    else if (this.tableStyle == 'dark')
      this.tableStyle = 'bootstrap';

  }

  /**
   * Handles translation of the page
   */
=======
    if (this.tableStyle === 'bootstrap') {
    this.tableStyle = 'dark';
    } else if (this.tableStyle === 'dark') {
    this.tableStyle = 'bootstrap';
 }

  }

>>>>>>> ccf754dfdcb03e7ff6c22fed2990d1de641b8c40
  async translatePage() {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    this.storage.ready().then(() => {

      this.storage.get('languagePreference').then((lP) => {

<<<<<<< HEAD
        // If no setting has been set, default is english
        if (lP == null) {
          lP = 'English';
          this.storage.set('languagePreference', 'English');
        }

        if (lP === 'English') {
          document.getElementById('textMonToThur').innerHTML = json.english.shuttle.monToThur;
          document.getElementById('textDepLoy1').innerHTML = json.english.shuttle.depLoy;
          document.getElementById('textDepSGW1').innerHTML = json.english.shuttle.depSGW;
          document.getElementById('textDepLoy2').innerHTML = json.english.shuttle.depLoy;
          document.getElementById('textDepSGW2').innerHTML = json.english.shuttle.depSGW;
          document.getElementById('textFriday').innerHTML = json.english.shuttle.friday;
        } else if (lP === 'French') {
          document.getElementById('textMonToThur').innerHTML = json.french.shuttle.monToThur;
          document.getElementById('textDepLoy1').innerHTML = json.french.shuttle.depLoy;
          document.getElementById('textDepSGW1').innerHTML = json.french.shuttle.depSGW;
          document.getElementById('textDepLoy2').innerHTML = json.french.shuttle.depLoy;
          document.getElementById('textDepSGW2').innerHTML = json.french.shuttle.depSGW;
          document.getElementById('textFriday').innerHTML = json.french.shuttle.friday;

        }
=======
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
>>>>>>> ccf754dfdcb03e7ff6c22fed2990d1de641b8c40

      });
    });
  }


}
