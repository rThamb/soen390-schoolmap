import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import {IonicStorageModule, Storage} from '@ionic/storage';
import { NearbyPointsOfInterestComponent } from './nearby-points-of-interest.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapComponent } from '../map/map.component';
import {MapService} from '../../services/map/map.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {autoSpy} from '../../../../auto-spy';

declare var google:any;

describe('NearbyPointsOfInterestComponent', () => {
  let component: NearbyPointsOfInterestComponent;
  let fixture: ComponentFixture<NearbyPointsOfInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyPointsOfInterestComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot(), RouterModule.forRoot([])],
      providers: [MapService, Geolocation, { provide: APP_BASE_HREF, useValue : '/' }, 
       ]
    }).compileComponents();

    fixture = TestBed.createComponent(NearbyPointsOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', async () => {
    expect(component).toBeTruthy();
  });

  xit('translate the page ', () => {
    spyOn(component, 'translatePage');

    expect(component.translatePage).toHaveBeenCalled();
  });

  xit('nearbyPOI should be called', () => {

    component.nearbyPOI = jasmine.createSpy('nearbyPOI spy');
    component.ngOnInit();
    // expect(component.nearbyPOI).toHaveBeenCalled();
    expect(component.nearbyPOI).toHaveBeenCalledTimes(4);
  });

  xit('LoadNewRoute should work', () => {
    expect(component.LoadNewRoute('NewRoute', '150 Rue Sainte-Catherine Ouest, Montréal')).toBeTruthy();
  });

  xit('listPOI ', () => {
    expect(component.listPOI('', '', 'restaurant')).toBeFalsy();
  });

  xit('should return a distance', () => {
    expect(component.calculateDistance('(45.4977417, -73.58028329999999)')).toBeTruthy();
  });

  xit('should load all UI elements to the screen', () => {
    fixture.autoDetectChanges();
    let el = fixture.debugElement.query(By.all());
    console.log(el);
    expect(el).toBeTruthy();
  });

})
