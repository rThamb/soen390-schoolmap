import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewRouteComponent } from './new-route.component';

describe('NewRouteComponent', () => {
  let component: NewRouteComponent;
  let fixture: ComponentFixture<NewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRouteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
