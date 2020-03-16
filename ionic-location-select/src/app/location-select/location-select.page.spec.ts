import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationSelectPage } from './location-select.page';

describe('LocationSelectPage', () => {
  let component: LocationSelectPage;
  let fixture: ComponentFixture<LocationSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
