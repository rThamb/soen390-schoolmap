import { TestBed } from '@angular/core/testing';
import { Building } from '../../models/Building';
import { BuildingFactoryService } from './building-factory.service';
import { IndoorPOI } from '../../models/IndoorPOI';

describe('BuildingFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [BuildingFactoryService]
  }).compileComponents());

  it('should be created', () => {
    const service: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    expect(service).toBeTruthy();
  });


  it('should properly create a Hall building instance with correct values', async () => {
    
    const buildingFactory: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    let  building: Building = await buildingFactory.loadBuilding('HB');

    let binaryGrid8th = [
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1]
  ];

  let firstPoi: IndoorPOI = new IndoorPOI(45.497386, -73.578535, 1, 5, "HB840"); 

    // Check if basic building values have been loaded properly
    expect(building.getBuildingName()).toEqual("Concordia University Hall Building");
    expect(building.getBuildingKey()).toEqual("HB");
    //expect(building.getBuildingInfo()['Address']).toEqual("1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8");
    
    // Check if the binary grid has been loaded properly
    expect(building.getFloorLevel('8').getBinaryGrid()).toEqual(binaryGrid8th);
    
    // Check if first POI of POI array is loaded.
    //expect(building.getAllIndoorPOI()[0]).toEqual(firstPoi);
  });

});
