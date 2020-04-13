import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service';
import { Building } from '../../models/Building';
import { stringify } from 'querystring';
import { Floor } from '../../models/Floor';
import { IndoorPOI } from '../../models/IndoorPOI';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
})
export class HomeSearchComponent implements OnInit {

  @Output() private searchIndoorPOIEvent = new EventEmitter();

  constructor(private bf: BuildingFactoryService, private storage: Storage) 
  {
    this.translatePage();
  }

  ngOnInit() {
  }

  // Loads the hall building (for now) and iterates through all classrooms to find a match. If success, send event to map component.
  goToSearchResult(sr: string)
  {
    this.bf.loadBuilding("HB").then((hb) =>{

      let floorLevel: number = Math.trunc(parseInt(sr.replace("HB", "")) / 100);
      let floor: Floor = hb.getFloorLevel(floorLevel + "");
      
      let floorPois: IndoorPOI[] = floor.getPois();
      console.log(floorPois);

      for(var i = 0; i < floorPois.length; i++)
      {
        if(floorPois[i].getKey() == sr)
        {
          console.log(floorPois[i].getKey());
          this.searchIndoorPOIEvent.emit(floorPois[i]);

          this.storage.ready().then(() => {
            this.storage.set('newRouteDest', sr);
          });
        }
      }

    });
  }
  
  async translatePage() {
    console.log('languageSet called');
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
      if( lP == 'English')
      {
        document.getElementsByName('search')[0].setAttribute('placeholder', json.english.placeholders.homeSearch);
      }
      //check if language is french with storage
      else if (lP == 'French')
      {
        document.getElementsByName('search')[0].setAttribute('placeholder', json.french.placeholders.homeSearch);
      }

    });

    });
  }


}
