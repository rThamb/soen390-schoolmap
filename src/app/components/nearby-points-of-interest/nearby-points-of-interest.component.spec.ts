import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NearbyPointsOfInterestComponent } from './nearby-points-of-interest.component';

describe('NearbyPointsOfInterestComponent', () => {
  let component: NearbyPointsOfInterestComponent;
  let fixture: ComponentFixture<NearbyPointsOfInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyPointsOfInterestComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NearbyPointsOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
