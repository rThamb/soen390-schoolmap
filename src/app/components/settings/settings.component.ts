import { User } from '../../models/User';
import { EventEmitter } from 'events';
import { Component, OnInit, Output, NgModule } from '@angular/core';
import {Storage} from '@ionic/storage';
import {  NavController } from '@ionic/angular';


/**
 * Component responsible for handling user's prefrences selection.
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  public useElevator: boolean;
  public useStairs: boolean;
  public useEscalator: boolean;
  public languagePreference: string;
  public useGoogleCalendarSync: boolean;

  constructor(private storage: Storage, 
              public navCtrl: NavController) {}

  //Method allows user to navigate to Notifications page
  LoadNewPage(page:string): void {
    this.navCtrl.navigateRoot(page);
  }

  // Initialize user settings
  ngOnInit() {

    this.storage.ready().then(() => {

      // Set useElevator key/value
      this.storage.get('useElevator').then((uE) => {
        if (uE == null) {
          this.storage.set('useElevator', true);
          this.useElevator = true;
        } else {
          this.useElevator = uE;
        }
      });
    // Set the useStairs key/values
      this.storage.get('useStairs').then((uS) => {
        if (uS == null) {
          this.storage.set('useStairs', true);
          this.useStairs = true;
        } else {
          this.useStairs = uS;
        }
      });
    // Set the useEscalators key/value
      this.storage.get('useEscalator').then((uE) => {
        if (uE == null) {
          this.storage.set('useEscalator', true);
          this.useEscalator = true;
        } else {
          this.useEscalator = uE;
        }
      });
    // Set the languagePreference key/value
      this.storage.get('languagePreference').then((lP) => {
        if (lP == "English") {
          this.storage.set('languagePreference', 'English');
          this.languagePreference = 'English';
        } 
        else if (lP == "French") {
          this.storage.set('languagePreference', 'French');
          this.languagePreference = 'French';
        }
      });
    // Set the googleSync key/value
      this.storage.get('useGoogleCalendarSync').then((gS) => {
        if (gS == null) {
          this.storage.set('useGoogleCalendarSync', false);
          this.useGoogleCalendarSync = false;
        } else {
          this.useGoogleCalendarSync = gS;
        }
      });
    });
  }

  // Stores the newly set value for the settting
  onChangeSetting(key: string, value: any) {
    this.storage.set(key, value);
  }

  async translatePage()
  {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    this.storage.ready().then(() => {

      this.storage.get('languagePreference').then((lP)=> {

      // If no setting has been set, default is english
      if(lP == null)
      {
        lP = 'English';
        this.storage.set('languagePreference', 'English');
      }

      if(lP === 'English')
      {
        document.getElementById('settingsTitle').innerHTML = json.english.settings.title;
        document.getElementById('settingsLanguage').innerHTML = json.english.settings.language;
        document.getElementById('optionL1').innerHTML = json.english.settings.optionL1;
        document.getElementById('optionL2').innerHTML = json.english.settings.optionL2;
        document.getElementById('settingsAccessibility').innerHTML = json.english.settings.accessibility;
        document.getElementById('settingsElevators').innerHTML = json.english.settings.elevators;
        document.getElementById('settingsStairs').innerHTML = json.english.settings.stairs;
        document.getElementById('settingsEscalators').innerHTML = json.english.settings.escalators;
        document.getElementById('settingsNotifications').innerHTML = json.english.settings.notif;
      }
      else if(lP === 'French')
      {
        document.getElementById('settingsTitle').innerHTML = json.french.settings.title;
        document.getElementById('settingsLanguage').innerHTML = json.french.settings.language;
        document.getElementById('optionL1').innerHTML = json.french.settings.optionL1;
        document.getElementById('optionL2').innerHTML = json.french.settings.optionL2;
        document.getElementById('settingsAccessibility').innerHTML = json.french.settings.accessibility;
        document.getElementById('settingsElevators').innerHTML = json.french.settings.elevators;
        document.getElementById('settingsStairs').innerHTML = json.french.settings.stairs;
        document.getElementById('settingsEscalators').innerHTML = json.french.settings.escalators;
        document.getElementById('settingsNotifications').innerHTML = json.french.settings.notif;
      }


      });
    });
  }



}
