import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service';
import { ReadGridService } from '../../services/readGrid/read-grid.service';
import { IonicModule } from '@ionic/angular';

import { MapComponent } from './map.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [Geolocation, IndoorPathingService, ReadGridService],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
