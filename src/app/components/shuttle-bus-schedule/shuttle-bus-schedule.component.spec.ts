import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {autoSpy} from '../../../../auto-spy';
import { ShuttleBusScheduleComponent } from './shuttle-bus-schedule.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {Storage} from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';

describe('ShuttleBusScheduleComponent', () => {
  let component: ShuttleBusScheduleComponent;
  let fixture: ComponentFixture<ShuttleBusScheduleComponent>;

  beforeEach(async(() => {
    const a = setup().default();
    TestBed.configureTestingModule({
      declarations: [ ShuttleBusScheduleComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, IonicModule.forRoot(), IonicStorageModule.forRoot()]
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

  it('when ngOnInit is called it should create the tablestyle with bootstrap', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    expect(c.tableStyle).toEqual('bootstrap');
});

  it('when changeStyle is called it should change the color to dark', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.changeStyle();
    // assert
    expect(c.tableStyle).toEqual('dark');
});
  it('should check if on click change color of the page', async(() => {
  spyOn(component, 'changeStyle');
  const button = fixture.debugElement.nativeElement.querySelector('ion-button');
  button.click();
  fixture.whenStable().then(() => {
     expect(component.changeStyle).toBeTruthy();
 });
}));

});

function setup() {
  const storage = autoSpy(Storage);
  const builder = {
        default() {
            return builder;
        },
        build() {
            return new ShuttleBusScheduleComponent(storage);
        }
    };
  return builder;
}
