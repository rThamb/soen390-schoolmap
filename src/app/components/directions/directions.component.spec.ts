import { MapService } from '../../services/map/map.service';
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service';
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service';
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {By} from '@angular/platform-browser';
import { autoSpy } from '../../../../auto-spy';

import { DirectionsComponent } from './directions.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('DirectionsComponent', () => {
  let component: DirectionsComponent;
  let fixture: ComponentFixture<DirectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot(),  IonicStorageModule.forRoot()],
      providers:[Geolocation]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
     expect(component).toBeTruthy();
  });

it('when isSGW is called it should verify string corresponds to SGW campus', () => {
    expect(component.isSGW("concordia university")).toBeTruthy();
});

it('when isLoyola is called it should verify string corresponds to loyola', () => {
    expect(component.isLoyola("concordia loyola")).toBeTruthy();
});

it('when isSchool is called it should check if is school', () => {
    expect(component.isSchool("concordia")).toBeTruthy();
});

it('when displayShuttle is called it should check if shuttle should be displayed', () => {
  component.directions['start'] = "concordia loyola";
  component.directions['destination'] = "concordia";
  let mockDate = new Date('2020-03-18 10:00')
  jasmine.clock().mockDate(mockDate); 
  expect(component.displayShuttle()).toBeFalsy();
});

it('when isDriving is called it should verify if it is selected', () => {
    expect(component.isDriving()).toBeFalsy();
});

it('when getTransportation is called it should get selected transportation', () => {
    expect(component.getTransportation).toBeTruthy();
});

it('when displayTravelInfo is called it should display travel time and distance', () => {
    var response =  { "routes": [ {
        "legs": [ {
            "duration": {
                "text": "10 min"
            },
            "distance": {
                "text": "2 km"
            }
        }]
    }]};
    component.displayTravelInfo(response);
    expect(component.travelDistance).toContain('2 km');
});

it('when validateInput is called it should validate university address', () => {
    expect(component.validateInput("Concordia University")).toBeTruthy();
});
/*
it('when getDirections is called it should', () => {
    component.directions['start'] = "H835";
    component.directions['destination'] = "H820";
    expect(component.getDirections()).toBeTruthy();
});

it('when preformOutdoorDirectionsActivity is called it should', () => {
    component.preformOutdoorDirectionsActivity("Concordia loyola", "Sir george williams");
});

it('when showClearDirectionControls is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.showClearDirectionControls();
    // assert
    // expect(c).toEqual
});

it('when clearDirections is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.clearDirections();
    // assert
    // expect(c).toEqual
});
*/
it('when useCurrentLocation is called it should fill start with users location', async () => {
    await component.useCurrentLocation().then( () => {
        expect(component.directions['start']).toContain(',');
    });

});

it('when getNextShuttleTime is called it should get the next shuttle time', async () => {
    let mockDate = new Date('2020-03-18 10:00')
    jasmine.clock().mockDate(mockDate); 
    let result = await component.getNextShuttleTime("loyola");
    expect(result).toBeTruthy();
});

});