import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service';
import { Building } from '../../models/Building';
import { stringify } from 'querystring';
import { Floor } from '../../models/Floor';
import { IndoorPOI } from '../../models/IndoorPOI';
import {MapService} from '../../services/map/map.service';
import {Storage} from '@ionic/storage';

declare var google


@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
})
export class HomeSearchComponent implements OnInit {

  geocoder = new google.maps.Geocoder;
  searchResult = ""
  map: any;
  marker: any;
  @Output() private searchIndoorPOIEvent = new EventEmitter();

  constructor(private bf: BuildingFactoryService, private storage: Storage,private mapService : MapService) 
  {
    //private allPois = buildingService.getindoorpois();
  }

  ngOnInit() {

  }

  
  //Sets map and calls the gecoder fucntion
  setSearchMarker(){
    this.map = this.mapService.getMap();
    this.geocodeAddress(this.geocoder, this.map)
  }

  //Given an instance of a map and a geocoder it pins a marker at a given location
  geocodeAddress(geocoder, map) {
    var address = this.searchResult
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        if(this.marker != null) {
          marker.setMap(null);
        }
        this.marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
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
  



}
