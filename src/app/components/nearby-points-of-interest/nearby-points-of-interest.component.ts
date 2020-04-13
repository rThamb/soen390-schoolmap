import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MapComponent} from '../../components/map/map.component'
import {MapService} from '../../services/map/map.service';
import {Storage} from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';


declare var google

@Component({
  selector: 'app-nearby-points-of-interest',
  templateUrl: './nearby-points-of-interest.component.html',
  styleUrls: ['./nearby-points-of-interest.component.scss'],
})
export class NearbyPointsOfInterestComponent implements OnInit {

  mapHandle: MapComponent;
  map:any;

  private page;
  private restaurants = [];
  private clothingStores = [];
  private banks = [];
  private hospitals = [];
  private restaurantType = "restaurant";
  private bankType = "bank";
  private clothesType = "clothing_store";
  private hospitalType = "hospital";

  constructor(private geolocation: Geolocation, private storage: Storage, public navCtrl: NavController, private mapSrevice : MapService) 
  {
    this.translatePage();
    this.map = this.mapSrevice.getMap();
    this.mapHandle = this.mapSrevice.getActiveMapComponent();
    this.page = "NewRoute";
  }

  
  ngOnInit() 
  {
    //Search for nearby poi
    this.nearbyPOI(this.restaurantType)
    this.nearbyPOI(this.bankType);
    this.nearbyPOI(this.clothesType);
    this.nearbyPOI(this.hospitalType);
  }

  //Loads the new route page, and sends the destination address to the direction component
  LoadNewRoute(page:string, address: string) 
  {
    this.storage.ready().then(() => {
      this.storage.set('newRouteDest', address);
    });

    this.navCtrl.navigateRoot(page); //Loads new route page
  }

  //Sends a request for a poi type
  nearbyPOI(type: string)
  {
    let self = this;

    var service = new google.maps.places.PlacesService(this.map);

    var request = {
      location: this.mapHandle.getCurrentLocation(),
      types: [type],
      rankBy: google.maps.places.RankBy.DISTANCE
    }
    service.nearbySearch(request, function(results, status)
    {
      self.listPOI(results, status, type);
    });   
  }

  //This method gets all the poi of a certain type
  listPOI(results, status, type) 
  {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var d = this.calculateDistance(results[i].geometry.location) //Calculate distance for each POI
        //Append object with new key-value (distance)
        results[i].distance = d.toFixed(2) //2 decimal places
      }
      //Set for the respective type of poi
      if(type == this.restaurantType)
      {
        this.restaurants = results;
      }
      else if(type == this.bankType)
      {
        this.banks = results;
      }
      else if(type == this.clothesType)
      {
        this.clothingStores = results;
      }
      else if(type == this.hospitalType)
      {
        this.hospitals = results;
      }        

    }
  }

  //Calculate distance between 2 latlng points
  calculateDistance(dest: string): number
  {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(this.mapHandle.getCurrentLocation(), dest);
    return distance;
  }

  async translatePage()
  {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    this.storage.ready().then(() => {

      this.storage.get('languagePreference').then((lP) => {

      // If no setting has been set, default is english
      if(lP == null)
      {
        lP = 'English';
        this.storage.set('languagePreference', 'English');
      }
      if(lP === 'English')
      {
        document.getElementById('poiTitle').innerHTML = json.english.nearbyPOI.title;

      }
      else if(lP === 'French')
      {
        document.getElementById('poiTitle').innerHTML = json.french.nearbyPOI.title;
      }


      });
    });
  }

}
