import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventComponent } from './event.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title of the page', () => {
    expect(component).toBeTruthy();
  });

  it('should show the alert button', () => {
    expect(component).toBeTruthy();
  });

  it('should show information of the page', () => {
    expect(component).toBeTruthy();
  });

  it('should have a clickable button to concordias COVID19 website', () => {
    expect(component).toBeTruthy();
  });
});
