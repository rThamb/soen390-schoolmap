import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../models/User'
import { EventEmitter } from 'events';
import {Storage} from '@ionic/storage';

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

  constructor(private storage: Storage) {

    // storage.ready() will wait for initialization of module before starting any actions
    storage.ready().then(() => {

      // Set useElevator key/value
      storage.get('useElevator').then((uE) => {
        if(uE == null)
        {
          storage.set('useElevator', true);
          this.useElevator = true;
        }
        else{
          this.useElevator = uE;
        }
      });
    // Set the useStairs key/value
      storage.get('useStairs').then((uS) => {
        if(uS == null)
        {
          storage.set('useStairs', true);
          this.useStairs = true;
        }
        else{
          this.useStairs = uS;
        }
      });
    // Set the useEscalators key/value
      storage.get('useEscalator').then((uE) => {
        if(uE == null)
        {
          storage.set('useEscalator', true);
          this.useEscalator = true;
        }
        else{
          this.useEscalator = uE;
        }
      });
    // Set the languagePreference key/value
      storage.get('languagePreference').then((lP) => {
        if(lP == null)
        {
          storage.set('languagePreference', 'English');
          this.languagePreference = 'English';
        }
        else{
          console.log(lP);
        }
      });
    // Set the googleSync key/value
      storage.get('useGoogleCalendarSync').then((gS) => {
        if(gS == null)
        {
          storage.set('useGoogleCalendarSync', false);
          this.useGoogleCalendarSync = false;
        }
        else{
          this.useGoogleCalendarSync = gS;
        }
      });
    });
  }

  // Stores the newly set value for the settting 
  onChangeSetting(key: string, value: any)
  {
    this.storage.set(key, value);
  }

  ngOnInit() {
    
    
  }

}
