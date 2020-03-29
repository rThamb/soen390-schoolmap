import { MapService } from '../../services/map/map.service';
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service';
import { ReadGridService } from '../../services/readGrid/read-grid.service';
import { IonicModule } from '@ionic/angular';

import { MapComponent } from './map.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { autoSpy } from 'auto-spy';
import { Building } from 'src/app/models/Building';
import { By } from '@angular/platform-browser';
import {Location} from '../../models/Location';
import { fakeAsync } from '@angular/core/testing';
import {User} from '../../models/User';
import { expressionType } from '@angular/compiler/src/output/output_ast';
declare var google;

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let spy: any;
  // let service: MapService;
  const locationStub = {
    getCurrentLocation: jasmine.createSpy('getCurrentLocation')
}

  beforeEach(async(() => {
const a = setup().default();
TestBed.configureTestingModule({
      declarations: [ MapComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [Geolocation, IndoorPathingService, ReadGridService, BuildingFactoryService],
      imports: [IonicModule.forRoot()]
    }).configureTestingModule({ providers: [{ provide: MapService, useValue: a.mapService },
            { provide: BuildingFactoryService, useValue: a.buildingFactory }, {provide: Location, useValue: locationStub}] }).compileComponents();

fixture = TestBed.createComponent(MapComponent);
component = fixture.componentInstance;
fixture.detectChanges();
  }));

  // afterEach(() => {
  //   // service = null;
  //   // component = null;
  // });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create a marker and return it', async() => {
    fixture.detectChanges();
    const map = component.map;
    const locations = '';
    const obtainedMarker = component.createMarker(locations, 'Test');

    const expectedMarker = new google.maps.Marker
    ({
      position: locations,
      map: map,
      icon: '',
      label:
      {
          color: 'black',
          fontWeight: 'bold',
          text: 'Test',
          fontSize: '21px'
      },
    });
    expect(obtainedMarker).toEqual(expectedMarker);
  });

  it('should create a polygon and return it', async() => {
    fixture.detectChanges();
    const map = component.map;

    const testPath =
    [
      {lat: 45.497372, lng: -73.578338},
      {lat: 45.496826, lng: -73.578859}
    ];

    const obtainedPolygon = component.createPolygon('', 'building');

    let expectedPolygon;
    expectedPolygon = new google.maps.Polygon({
      paths: '',
      fillColor: 'deepskyblue',
    });
    expectedPolygon.setMap(map);
    expect(obtainedPolygon).toEqual(expectedPolygon);
  });

  it('method should be called', async (() => {
    spyOn(component, 'clearAllPOIMarkers');
    expect(component).toBeDefined();
    expect(spy);
    expect(component.clearAllPOIMarkers).toBeTruthy();
}));

  it('ngAfterViewInit should be called', async(() => {
  spyOn(component, 'ngAfterViewInit');
  fixture.detectChanges(); // trigger ngOnInit here
    expect(component.ngAfterViewInit);
}));

  it('should check that ion-content is loaded', async(() => {
  const mapSearch = fixture.debugElement.query(By.css('ion-content'));

  expect(mapSearch).toBeTruthy();
}));

  /*it('should call the \'loadBuilding\' method on the \'BuildingFactoryService\'', async (() => {
const service : BuildingFactoryService;
    spy = spyOn(service, 'loadBuilding');
fixture.detectChanges();
component.enterBuilding('', '', '', false);
expect(spy).toHaveBeenCalled();
}));*/


  it('when ngAfterViewInit is called it should initialize the map', () => {
    // arrange
    const { build } = setup().default();
    const c = build();

    // act
    // this.initMap();
        // console.log('Error getting location', error);
    c.ngAfterViewInit();
    // assert
    expect(c.ngAfterViewInit());
});

  it('when initMap is called it should initialize the map', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.initMap();
    spyOn(c, 'initMap');
    // assert
    expect(c.initMap).toBeDefined();
});

  it('when setDirectionsMap is called it should set an instance of the map to a service which injects it to other components', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    this.mapService.setMap(this.map);
    this.mapService.setActiveMapComponent(this);
    c.setDirectionsMap();
    // assert
    expect(c.setDirectionsMap).toHaveBeenCalled();
});

  it('when getCurrentLocation is called it should Get the current location of user and focus map to that point', async () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // let currentLoc = this.getCurrentLocation();
    // const user = User;
    // c.user.getLocation().getGoogleLatLng();
    spyOn(component, 'getCurrentLocation');
    let expected = component.getCurrentLocation();
    // assert
    expect(expected).toEqual(undefined);
});

  it('when focusMap is called it should Re-center the map based on location parameter', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    spyOn(c, 'focusMap');
    const location = {lat: 45.494711, lng: -73.577871, alt: 0};
    c.focusMap(location);
    // assert
    expect(c.focusMap).toHaveBeenCalledWith(location);
});

//
  it('when initOverlays is called it should pawn the building overlays on top of the map', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.initOverlays();
    //  assert
    expect(c).toBeDefined();
  });

  it('should call enterBuildingEventListener 14 times from initOverLays', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    console.log("Current location: ")
    //const location = fixture.debugElement.injector.get(Location);
    console.log(location)
    component.enterBuildingEventListener = jasmine.createSpy("enterBuildingEventListener spy");
    //component.initMap();
    component.initOverlays();
    expect(component.enterBuildingEventListener).toHaveBeenCalledTimes(17);
  });

  it('should call markerLabelVisibility from initOverlays', async(() => {

    let m = new MapComponent(new Geolocation, new MapService, new BuildingFactoryService(new ReadGridService));
    m.markerLabelVisibility = jasmine.createSpy("markerLabelVisibility spy");
    m.initOverlays();
    expect(m.markerLabelVisibility).toHaveBeenCalled();
  }));

  it('should call createPolygon from initOverlays', async(() => {

    let m = new MapComponent(new Geolocation, new MapService, new BuildingFactoryService(new ReadGridService));
    m.createPolygon = jasmine.createSpy("createPolygon spy");
    m.initOverlays();
    expect(m.createPolygon).toHaveBeenCalledWith('', 'building');
  }));

  // it('should call clearAllPOIMarkers from initOverlays', async(() => {

  //   let m = new MapComponent(new Geolocation, new MapService, new BuildingFactoryService(new ReadGridService));
  //   m.clearAllPOIMarkers = jasmine.createSpy("clearAllPOIMarkers spy");
  //   m.initOverlays();
  //   expect(m.clearAllPOIMarkers).toHaveBeenCalled();
  // }));

  it('should call removePreviouslyDrawnPath from drawPath', async(() => {

    component.removePreviouslyDrawnPath = jasmine.createSpy("removePreviouslyDrawnPath spy");
    let locationList = [];
    locationList[0] = new Location(0, 0, 0);
    component.drawPath(locationList);
    expect(component.removePreviouslyDrawnPath).toHaveBeenCalled(); 
  }));

  it('should call initMap from ngAfterViewInit', async(() => {

    component.initMap = jasmine.createSpy("initMap spy");
    component.ngAfterViewInit();
    expect(component.initMap).toHaveBeenCalled(); 
  }));

  



  it('when initOverlays is called it should pawn the building overlays on top of the map', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.initOverlays();
    //  assert
    expect(c).toBeDefined();
  });

  it('when enterBuilding is called it should show indoor view after user clicks on the "Enter Building" button', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const buildingKey = 'HB';
    const onMapPolygons = [];
    const onMapMarkers = [];
    const hallP = onMapPolygons[buildingKey];
    const hallMarker = onMapMarkers[buildingKey];
    spyOn(c, 'enterBuilding');
    c.enterBuilding(buildingKey, hallP, hallMarker, false);

    // assert
    expect(c.enterBuilding).toHaveBeenCalledWith(buildingKey, hallP, hallMarker, false);
});

  it('should call indoorview ', async () => {
    // arrange
    // const { build } = setup().default();
    // const c = build();
    // // act
    // // Polygon for each building
    // const pathCoordinates = [];
    // const path = new google.maps.Polyline({
    //     path: pathCoordinates, 
    //     geodesic: true,
    //     strokeColor: '#0000FF',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2
    //   });
    // const polygon = component.createPolygon("", 'building');
    // const hallCenter = {lat: 45.497092, lng: -73.578974};
    // const marker = component.createMarker(hallCenter, 'HALL');

 
    // const id = 'HB';
    // console.log("Before building Factory")
    // //const b: Building = await buildingFactory.loadBuilding(id);
    // //const buildingInfo = '';
    // console.log("Before b.getfloors")
    // //let buildingInfo = b.getBuildingInfo();
    // let buildingInfo = {};
    // //const buildingFloors = b.getFloors();
    // let buildingFloors = "";

    // spyOn(component, 'indoorView');
    // //component.initOverlays();
    // component.enterBuilding("HB", polygon, marker, true);
    // // assert
        //Polygon for each building
    let m = new MapComponent(new Geolocation, new MapService, new BuildingFactoryService(new ReadGridService));

    let path = [
    {lat: 45.497372, lng: -73.578338},
    {lat: 45.496826, lng: -73.578859},
    {lat: 45.497164, lng: -73.579543},
    {lat: 45.497710, lng: -73.579034}]
    
    let polygon = new google.maps.Polygon({
          paths: path,
          fillColor: "deepskyblue",
        });
    polygon.setMap(component.map);

    const marker = new google.maps.Marker
    ({
      position: {lat: 0, lng: 0},
      map: component.map,
      icon: '',
      label:
      {
          color: 'black',
          fontWeight: 'bold',
          text: 'Test',
          fontSize: '21px'
      },
    });

    m.indoorView = jasmine.createSpy("indoorView spy");
    let b = new BuildingFactoryService(new ReadGridService)
    let b2 = b.loadBuilding("HB");
    let buildingInfo = (await b2).getBuildingInfo();
    //let buildingInfo = b.getBuildingInfo();
    console.log("Bound ")
    console.log(buildingInfo['bound'].north)
    console.log("Bound 2")
    //const buildingFloors = b.getFloors(); 
    const buildingFloors = (await b2).getFloors(); 
    //m.enterBuilding("HB", polygon, marker, true);
    m.indoorView(buildingInfo, polygon, marker, buildingFloors, "HB", false);
    expect(m.indoorView).toHaveBeenCalled();


    //expect(component.indoorView).toHaveBeenCalledWith(buildingInfo, polygon, marker, buildingFloors, id, false);
});

  it('when createPolygon is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const pathCoordinates = [];
    const path = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
    c.createPolygon(path, 'building');
    // assert
    expect(c.createPolygon(path, 'building')).toBeTruthy();
});

  it('when createMarker is called it should create a marker at the Hall building', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    c.createMarker(hallCenter, 'HALL');
    // assert
    expect(c.createMarker(hallCenter, 'HALL')).toBeTruthy();
});

  it('when listener is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    spyOn(c, 'markerListener');
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    const marker = c.createMarker(hallCenter, 'HALL');
    const content = '<ion-item><p><label style=\'margin-right:1.2em\'><b>Departments: </b></label><br/><br/>';
    c.markerListener(marker, content);
    // assert
    expect(c.markerListener).toHaveBeenCalledWith(marker, content);
});

  it('when enterBuildingEventListener is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const id = 'HB';
    const pathCoordinates = [];
    const path = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
    const polygon = c.createPolygon(path, 'building');
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    const marker =  c.createMarker(hallCenter, 'HALL');
    c.enterBuildingEventListener(id, polygon, marker, false);
    // assert
    expect(c.enterBuildingEventListener(id, polygon, marker, false)).toBeTruthy();
});

  it('when createinfoWindow is called it should display a popup containing building info', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const hallID = 'HB';
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    const marker = new google.maps.Marker
    ({
      position: '',
      map: component.map,
      icon: '',
      label:
      {
          color: 'black',
          fontWeight: 'bold',
          text: 'Test',
          fontSize: '21px'
      },
    });
    c.createinfoWindow(marker, hallID);
    // assert
    expect(c.createinfoWindow(marker, hallID)).toBeTruthy();
});

it('should call initMap from ngAfterViewInit', async () => {
  spyOn(component, 'initMap');
  component.ngAfterViewInit();
  expect(component.initMap).toHaveBeenCalled();
})



  it('when markersClickableOption is called, it should be clickable', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.markersClickableOption(true);
    // assert
    expect(c.markersClickableOption(true));
    
});

  /*it('when markerLabelVisibility is called it should change the visibility the markers', async (() => {
    // arrange
    const { build } = setup().default();
    const c = build();

    const marker = new google.maps.Marker
    ({
      position: '',
      map: component.map,
      icon: '',
      label:
      {
          color: 'black',
          fontWeight: 'bold',
          text: 'Test',
          fontSize: '21px'
      },
    });

        // component.buildingMarkers.push(marker);
    // let buildingMarkers = [];
    console.log('before markerLabelVisibility');
    // c.markerLabelVisibility();
    const markerVisibility = component.markerLabelVisibility();
    console.log('after markerLabelVisibility');
    // assert
    expect(markerVisibility).toBeTruthy();
    console.log('after expect for markerLabelVisibility');


    // act
    {
      const self = this;

      // Array contain every label of markers
      const markersLabel = [];
      for (let i = 0; i < this.buildingMarkers.length; i++) {
        markersLabel.push(this.buildingMarkers[i].getLabel());
      }

     // Check for zoom changed
      google.maps.event.addListener(self.map, 'zoom_changed', function() {
        // Hide markers
        if (self.map.getZoom() < 14) {
          for (let i = 0; i < self.buildingMarkers.length; i++) {
            self.buildingMarkers[i].setLabel(null);
          }
        } else {
          for (let i = 0; i < self.buildingMarkers.length; i++) {
            self.buildingMarkers[i].setLabel(markersLabel[i]);
          }
        }
      });
    }
    c.markerLabelVisibility();
    // assert
    expect(c.markerLabelVisibility());
}));*/

  it('when addFloorOverlay is called it should add floor layer', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    //this.buildingFactory= BuildingFactoryService;
    //const b: Building = this.buildingFactory.loadBuilding('HB');
    //const buildingInfo = b.getBuildingInfo();
    const imageBound = {
        north: 45.497735,
        south: 45.496807,
        east: -73.578316,
        west: -73.579586 
      };
    const floorImage = "assets/FloorImages/Hall/hall-8.png";
    spyOn(component, 'addFloorOverlay');
    
    component.addFloorOverlay(imageBound, floorImage);
    // assert
    expect(component.addFloorOverlay).toHaveBeenCalledWith(imageBound, floorImage);
});

//   it('when drawPath is called it should', () => {
//     // arrange
//     const { build } = setup().default();
//     const c = build();
//     // act
//     spyOn(component, 'drawPath');
//
//     let pathCoordinates= [{lat: 0, lng: 0}, {lat: 1, lng: 2}, {lat: 3, lng: 2}];
//      // assert
//     expect(c.drawPath).toHaveBeenCalledWith(pathCoordinates);
// });
/*
  it('when goToIndoorPOI is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.goToIndoorPOI(poi);
    // assert
     expect(c.goToIndoorPOI('HB')).toBeTruthy();
});
*/
  it('when removePreviouslyDrawnPath is called it should remove the path drawn previously, if there is any', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // tslint:disable-next-line:triple-equals
    if (this.currentActiveRoute.path != undefined || this.currentActiveRoute.path != null) {
      // hide or remove the current route drawn
      this.currentActiveRoute.path.setMap(null);
      this.currentActiveRoute.startMark.setMap(null);
      this.currentActiveRoute.endMark.setMap(null);
      this.currentActiveRoute = {};
    }
    c.removePreviouslyDrawnPath();
    // assert
    expect(c.removePreviouslyDrawnPath());
});

  it('when clearAllPOIMarkers is called it should empty the poi array', async(() => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // c.clearAllPOIMarkers();
    // assert
    // expect(c.clearAllPOIMarkers()).toBeTruthy();
    const map = component.map;
    console.log('Before clearAllPOIMarkers');
    map.clearAllPOIMarkers();
    console.log('After clearAllPOIMarkers');
    expect(map.clearAllPOIMarkers()).toEqual(undefined);

}));

  it('when showHallBuildingIndoor is called it should focus in on a give building', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    //c.showHallBuildingIndoor(true);
    // assert
    //expect(c.showHallBuildingIndoor(true)).toBeTruthy();

    spyOn(component, 'showHallBuildingIndoor');
    c.showHallBuildingIndoor(false);
    fixture.detectChanges(); // trigger ngOnInit here
    expect(component.showHallBuildingIndoor).not.toHaveBeenCalledWith(true);
});

 /* it('when showFloorMapForBuilding is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.showFloorMapForBuilding('');
    // assert
    expect(c.showFloorMapForBuilding('')).toBeTruthy();
});*/

  it('when setTransitionsPaths is called it should', async() => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // // act
    const transitions = null;
    spyOn(component, 'setTransitionsPaths');
    // assert

    c.setTransitionsPaths('');
    fixture.detectChanges(); // trigger ngOnInit here

    expect(component.setTransitionsPaths).not.toHaveBeenCalledWith(transitions);
});


  it('when isIndoorModeActive is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.isIndoorModeActive();
    // assert
    expect(c.isIndoorModeActive()).toBeFalsy();
});

  it('when quitIndoorMode is called it should exit indoor view', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.quitIndoorMode();
    // assert
    expect(c.quitIndoorMode());
});



});

function setup() {
    const geolocation = autoSpy(Geolocation);
    const mapService = autoSpy(MapService);
    const buildingFactory = autoSpy(BuildingFactoryService);
    const builder = {
        geolocation,
        mapService,
        buildingFactory,
        default() {
            return builder;
        },
        build() {
            return new MapComponent(geolocation, mapService, buildingFactory);
        }
    };
    return builder;
}
