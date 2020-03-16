import { Component, OnInit } from '@angular/core';
import { ReadGridService } from '../../services/readGrid/read-grid.service';
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service';
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service';
import {NavController, ModalController} from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  address;

  constructor() {
  }


  ngOnInit(): void {
  }
}

