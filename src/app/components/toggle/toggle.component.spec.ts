import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ToggleComponent } from './toggle.component';
import {MapComponent} from '../map/map.component';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';


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
  // arrange
  const { build } = setup().default();
  const c = build();
  // act
  c.callparentloy();
  // assert
  
  expect(c).toBeTruthy();
});

it('when callparentsgw is called it should redirect the the map to SGW', () => {
  // arrange
  const { build } = setup().default();
  const c = build();
  // act
  c.callparentsgw();
  // assert
 
  expect(c).toBeTruthy();
});




});

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
}
