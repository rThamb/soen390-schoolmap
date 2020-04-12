import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { NearbyPointsOfInterestComponent } from './nearby-points-of-interest.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapComponent } from '../map/map.component';
import {MapService} from '../../services/map/map.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

declare var google;

describe('NearbyPointsOfInterestComponent', () => {
  let component: NearbyPointsOfInterestComponent;
  let fixture: ComponentFixture<NearbyPointsOfInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyPointsOfInterestComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot(), RouterModule.forRoot([])],
      providers: [MapService, Geolocation, { provide: APP_BASE_HREF, useValue : '/' } ]
    }).compileComponents();

    fixture = TestBed.createComponent(NearbyPointsOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async () => {
      expect(component).toBeTruthy();
  });

  it('nearbyPOI should be called', () => {

    component.nearbyPOI = jasmine.createSpy("nearbyPOI spy");
    component.ngOnInit();
    //expect(component.nearbyPOI).toHaveBeenCalled();
    expect(component.nearbyPOI).toHaveBeenCalledTimes(4);
  });

  it('LoadNewRoute should work', () => {
    expect(component.LoadNewRoute("NewRoute", "150 Rue Sainte-Catherine Ouest, Montréal")).toBeTruthy();
  });

  it('listPOI ', () => {
    expect(component.listPOI("", "", "restaurant")).toBeFalsy();
  });

  // it('translatePage should work', () => {
  //   expect(component.translatePage).toBeTruthy();
  // });

  

  it('should return a distance', () => {
    expect(component.calculateDistance("(45.4977417, -73.58028329999999)")).toBeTruthy();
  });

  // it('should contain "Nearby Points of Interest"', () => {
  //   const bannerElement: HTMLElement = fixture.nativeElement;
  //   const p = bannerElement.querySelector('p');
  //   expect(p.textContent).toEqual('Nearby Points of Interest');
  // });

  // it('should find the <p> with fixture.debugElement.query(By.css)', () => {
  //   const bannerDe: DebugElement = fixture.debugElement;
  //   const paragraphDe = bannerDe.query(By.css('p'));
  //   const p: HTMLElement = paragraphDe.nativeElement;
  //   expect(p.textContent).toEqual('Nearby Points of Interest');
  // });

  // it('should have Destination in "openButton"', () => {
  //   const btn = fixture.debugElement.nativeElement.query(By.css('.openButton')).nativeElement;
  //   expect(btn.innerHTML).toBe('Destination');
  // });
});
