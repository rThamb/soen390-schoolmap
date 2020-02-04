import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocateMeComponent } from './locate-me.component';

describe('LocateMeComponent', () => {
  let component: LocateMeComponent;
  let fixture: ComponentFixture<LocateMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateMeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocateMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
