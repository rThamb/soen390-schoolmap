import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TestBed } from '@angular/core/testing';
import { IndoorPathingService } from './indoor-pathing.service';
import { ReadGridService } from '../readGrid/read-grid.service';
import { Floor } from '../../models/Floor';


describe('IndoorPathingService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ReadGridService, IndoorPathingService, Geolocation]
  }).compileComponents());

  it('should be created', () => {
    const service: IndoorPathingService = TestBed.get(IndoorPathingService);
    console.log('Checking instance');
    expect(service).toBeTruthy();
  });

  it('should determine shortest path', async () => {

    const service: IndoorPathingService = TestBed.get(IndoorPathingService);
    const service2: ReadGridService = TestBed.get(ReadGridService);
    console.log('indoor-pathing-service-spec: Checking instance');

    const floor: Floor = await service2.createGrid('H8');

    const startX = 2;
    const startY = 3;
    const endX = 7;
    const endY = 3;

    const path = service.determineOptimalPath(startX, startY, floor);
    const expectedCoordinates = '2,3,3,3,4,3,5,3,6,3,7,3';

    console.log('checking shortest path');
    expect(expectedCoordinates + '').toContain(path.toString());
  });


});
