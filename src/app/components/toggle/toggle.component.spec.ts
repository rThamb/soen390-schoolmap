import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ToggleComponent } from './toggle.component';
import {MapComponent} from '../map/map.component';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Location} from '../../models/Location';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async(() => {
    const a = setup().default();
    TestBed.configureTestingModule({
      declarations: [ ToggleComponent, MapComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain loyola and sir george', () => {
    const de = fixture.debugElement.query(By.css('.toolbar'));
    expect(de.nativeElement.textContent).toContain('LOYOLA');

    const de1 = fixture.debugElement.query(By.css('.toolbar'));
    expect(de1.nativeElement.textContent).toContain('GEORGE');
  });

  it('when callparentloy is called it should redirect the the map to loyola', () => {
    spyOn(component, 'callparentloy');
    const button = fixture.debugElement.nativeElement.querySelector('ion-button');
    fixture.whenStable().then(() => {
      component.callparentloy();
      expect(component.toggleevent.emit).toHaveBeenCalledWith(new Location(45.458234, -73.640493, 0));
      expect(button).toBeTruthy();
   });

});

  it('when callparentsgw is called it should redirect the the map to SGW', () => {
    spyOn(component, 'callparentsgw');
    const button = fixture.debugElement.nativeElement.querySelector('ion-button');
    fixture.whenStable().then(() => {
      component.callparentsgw();
      expect(component.toggleevent.emit).toHaveBeenCalledWith(new Location(45.494711, -73.577871, 0));
      expect(button).toBeTruthy();
   });

});

  it('should call the function callparentlocate() when user click on locate me button', async(() => {
  spyOn(component, 'callparentloy');
  const button = fixture.debugElement.nativeElement.querySelector('ion-segment-button:nth-child(1)');
  button.click();

  fixture.whenStable().then(() => {
    expect(component.callparentloy).toHaveBeenCalled();
  });
}));

  it('should call the function callparentsgw() when user click on locate me button', async(() => {
  spyOn(component, 'callparentsgw');
  const button = fixture.debugElement.nativeElement.querySelector('ion-segment-button:nth-child(2)');
  button.click();

  fixture.whenStable().then(() => {
    expect(component.callparentsgw).toHaveBeenCalled();
  });

  it('should load all UI elements to the screen', () => {
    fixture.autoDetectChanges();
    let el = fixture.debugElement.query(By.all());
    console.log(el);
    expect(el).toBeTruthy();
  });
}));

  function setup() {
    const builder = {
        default() {
            return builder;
        },
        build() {
            return new ToggleComponent();
        }
    };
    return builder;
}});
