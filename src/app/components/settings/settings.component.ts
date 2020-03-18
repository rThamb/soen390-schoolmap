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
  public useEscalators: boolean;
  public languagePreference: string;
  public googleSync: boolean;

  @Output() useElevatorEvent = new EventEmitter();
  @Output() useStairsEvent = new EventEmitter();
  @Output() useEscalatorsEvent = new EventEmitter();

  @Output() languagePreferenceEvent = new EventEmitter();
  @Output() googleSyncEvent = new EventEmitter();


  constructor(private storage: Storage) { 
    debugger;

    storage.ready().then(()=>{
      // Set useElevator key/value
      storage.get('useElevator').then((uE) => {
        if(uE == null)
        {
          storage.set('useElevator', true);
        }
        else{
          console.log(uE);
        }
      });
    // Set the useStairs key/value
      storage.get('useStairs').then((uS) => {
        if(uS == null)
        {
          storage.set('useStairs', true);
        }
        else{
          console.log(uS);
        }
      });
    // Set the useEscalators key/value
      storage.get('useEscalators').then((uE) => {
        if(uE == null)
        {
          storage.set('useEscalators', true);
        }
        else{
          console.log(uE);
        }
      });
    // Set the languagePreference key/value
      storage.get('languagePreference').then((lP) => {
        if(lP == null)
        {
          storage.set('languagePreference', true);
        }
        else{
          console.log(lP);
        }
      });
    // Set the googleSync key/value
      storage.get('googleSync').then((gS) => {
        if(gS == null)
        {
          storage.set('googleSync', true);
        }
        else{
          console.log(gS);
        }
      });
    });

  }

  ngOnInit() {
    
  }

  triggerAccessibilityEvent()
  {
    console.log('Toggle Accessibility ON')
  }


  triggerElevatorEvent()
  {
    console.log('Toggle Elevator')
  }

  triggerStairsEvent()
  {
    console.log('Toggle Stairs ON')
  }

  triggerEscalatorEvent()
  {
    console.log('Toggle Escalator ON')
  }

  triggerLanguagePreferenceEvent()
  {

  }

  triggerGoogleSyncEvent()
  {
    console.log('Toggle google ON')
  }

}
