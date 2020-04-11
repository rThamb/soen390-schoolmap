import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  beforeEach(() =>  TestBed.configureTestingModule({
    imports: [IonicStorageModule.forRoot()]
  }).compileComponents());

  it('should be created', () => {
    const service: HistoryService = TestBed.get(HistoryService);
    expect(service).toBeTruthy();
  });
});
