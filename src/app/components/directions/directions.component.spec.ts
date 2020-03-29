import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { DirectionsComponent } from './directions.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

declare var google;

describe('DirectionsComponent', () => {
  let component: DirectionsComponent;
  let fixture: ComponentFixture<DirectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule, google, Geolocation],
      providers:[Geolocation, google]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  

});
