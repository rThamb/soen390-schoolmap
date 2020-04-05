import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import {Location} from "../../models/Location";
@Component({
  selector: 'app-nearby-points-of-interest',
  templateUrl: './nearby-points-of-interest.component.html',
  styleUrls: ['./nearby-points-of-interest.component.scss'],
})
export class NearbyPointsOfInterestComponent implements OnInit {

  @Output() private poievent = new EventEmitter();

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  //Method allows user to navigate between pages using menu component
  LoadNewPage(page:string, address: String): void 
  {
    this.navCtrl.navigateRoot(page);
    console.log("Address: " + address)
    this.poievent.emit(new Location(45.458234, -73.640493, 0));
  }
  

}
