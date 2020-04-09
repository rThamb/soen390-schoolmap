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
        if (lP == null) {
          this.storage.set('languagePreference', 'English');
          this.languagePreference = 'English';
        } else {
          console.log(lP);
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



}
