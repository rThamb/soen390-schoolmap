import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShuttleBusScheduleComponent } from './shuttle-bus-schedule.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('ShuttleBusScheduleComponent', () => {
  let component: ShuttleBusScheduleComponent;
  let fixture: ComponentFixture<ShuttleBusScheduleComponent>;

  beforeEach(async(() => {
    const a = setup().default();
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
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    // expect(c).toEqual
});

  it('when changeStyle is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.changeStyle();
    // assert
    // expect(c).toEqual
});


});

function setup() {
    const builder = {
        default() {
            return builder;
        },
        build() {
            return new ShuttleBusScheduleComponent();
        }
    }
    return builder;
}