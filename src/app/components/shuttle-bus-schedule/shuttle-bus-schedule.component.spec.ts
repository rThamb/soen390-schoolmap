import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShuttleBusScheduleComponent } from './shuttle-bus-schedule.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('ShuttleBusScheduleComponent', () => {
  let component: ShuttleBusScheduleComponent;
  let fixture: ComponentFixture<ShuttleBusScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuttleBusScheduleComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShuttleBusScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have monday to friday schedule', () => {
    const mon = fixture.debugElement.query(By.css('.monday'));
    expect(mon.nativeElement.textContent).toContain('Monday');

    const fri = fixture.debugElement.query(By.css('.friday'));
    expect(fri.nativeElement.textContent).toContain('Friday');
  });

});
