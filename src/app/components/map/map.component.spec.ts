import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service';
import { ReadGridService } from '../../services/readGrid/read-grid.service';
import { IonicModule } from '@ionic/angular';
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service';

import { MapComponent } from './map.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import { MapService } from '../../services/map/map.service';

declare var google;

describe('MapComponent', () => {
  var component: MapComponent;
  var fixture: ComponentFixture<MapComponent>;
  var spy: any;
  //let service: MapService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [Geolocation, IndoorPathingService, ReadGridService, BuildingFactoryService],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  }));

  afterEach(() => {
    //service = null;
    //component = null;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should check if the class="map" is applied to map', async(() => {
    fixture.detectChanges();
    const mapTag = fixture.debugElement.nativeElement.querySelector('div');

    // expect(mapTag.innerHTML).toContain('class="map"');
  }));

  it('should create a marker and return it', async(() => 
  {
    fixture.detectChanges();
    let map = component.map;
    let locations = "";
    let obtainedMarker = component.createMarker(locations, "Test");
  
    let expectedMarker = new google.maps.Marker
    ({
      position: locations,
      map: map,
      icon: "",
      label: 
      {
          color: 'black',
          fontWeight: 'bold',
          text: "Test",
          fontSize: '21px'
      },
    }); 
    expect(obtainedMarker).toEqual(expectedMarker);
  }));

  it('should create a polygon and return it', async(() => 
  {
    fixture.detectChanges();
    let map = component.map;

    var testPath =
    [
      {lat: 45.497372, lng: -73.578338},
      {lat: 45.496826, lng: -73.578859}
    ];
    
    let obtainedPolygon = component.createPolygon("", "building");
  
    let expectedPolygon;
    expectedPolygon = new google.maps.Polygon({
      paths: "",
      fillColor: "deepskyblue",
    });
    expectedPolygon.setMap(map);
    expect(obtainedPolygon).toEqual(expectedPolygon);
  }));

//   it('method should be called', async (() => {
//     spy = spyOn(component, "clearAllPOIMarkers").and.callThrough();
//     expect(component).toBeDefined();
//     expect(spy);
//     expect(component.clearAllPOIMarkers).toHaveBeenCalled(); 
// }));

it('ngAfterViewInit should be called', () => {
  spyOn(component, 'ngAfterViewInit'); 
  fixture.detectChanges(); // trigger ngOnInit here

  expect(component.ngAfterViewInit).toHaveBeenCalled(); 
});

it('should check that ion-content is loaded', async(() => {
  let mapSearch= fixture.debugElement.query(By.css('ion-content'));

  expect(mapSearch).toBeTruthy();
}));

// it("should call the 'loadBuilding' method on the 'BuildingFactoryService'", async (() => {
//   let service: BuildingFactoryService;
//   spy = spyOn(service, 'loadBuilding');
//   fixture.detectChanges();
//   component.enterBuilding("", "", "", false);
//   expect(spy).toHaveBeenCalled();
// }));

});

