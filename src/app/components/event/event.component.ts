import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.translatePage();
  }

  // Handles translating content on the page depending on languagePreference value set in storage.
  async translatePage() {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    await this.storage.ready().then(() => {
      this.storage.get('languagePreference').then((lP) => {

        // Check if variable has been set by user, else set English as default
        if (lP == null) {
          lP = 'English';
          this.storage.set('languagePreference', 'English');
        }
        if (lP == 'English') {
          document.getElementById('maintitle').innerHTML = json.english.events.title;
          document.getElementById('alertButton').innerHTML = json.english.events.alertButton;
          document.getElementById('info1').innerHTML = json.english.events.info1;
          document.getElementById('info2').innerHTML = json.english.events.info2;
          document.getElementById('info3').innerHTML = json.english.events.info3;
          document.getElementById('info4').innerHTML = json.english.events.info4;
   } else if (lP == 'French') {
          document.getElementById('maintitle').innerHTML = json.french.events.title;
          document.getElementById('alertButton').innerHTML = json.french.events.alertButton;
          document.getElementById('info1').innerHTML = json.french.events.info1;
          document.getElementById('info2').innerHTML = json.french.events.info2;
          document.getElementById('info3').innerHTML = json.french.events.info3;
          document.getElementById('info4').innerHTML = json.french.events.info4;
       }

      });
    });
  }


}
