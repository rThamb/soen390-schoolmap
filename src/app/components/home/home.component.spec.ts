import { Geolocation } from '@ionic-native/geolocation/ngx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import {By} from "@angular/platform-browser";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [IonicModule.forRoot()],
      providers:[Geolocation],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check that all components on home page are loaded', () => {
    let homeSearch= fixture.debugElement.query(By.css('app-home-search'));
    let appToggle= fixture.debugElement.query(By.css('app-toggle'));
    let appMap= fixture.debugElement.query(By.css('app-map'));
    let locateMe= fixture.debugElement.query(By.css('app-locate-me'));
    let goButton= fixture.debugElement.query(By.css('app-go-button'));

    expect(homeSearch).toBeTruthy();
    expect(appToggle).toBeTruthy();
    expect(appMap).toBeTruthy();
    expect(locateMe).toBeTruthy();
    expect(goButton).toBeTruthy();
  });

});
