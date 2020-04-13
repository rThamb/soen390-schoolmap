import { Geolocation } from '@ionic-native/geolocation/ngx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import {By} from '@angular/platform-browser';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {autoSpy} from '../../../../auto-spy';
import {AboutUsComponent} from '../about-us/about-us.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
      providers: [Geolocation],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('translate the page ', () => {
    const { build } = setup().default();
    const c = build();

    const  spyTemp  =  spyOn(c , 'translatePage');
    c.translatePage();
    expect(spyTemp).toHaveBeenCalled();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check that all components on home page are loaded', () => {
    const homeSearch = fixture.debugElement.query(By.css('app-home-search'));
    const appToggle = fixture.debugElement.query(By.css('app-toggle'));
    const appMap = fixture.debugElement.query(By.css('app-map'));
    const locateMe = fixture.debugElement.query(By.css('app-locate-me'));
    const goButton = fixture.debugElement.query(By.css('app-go-button'));

    expect(homeSearch).toBeTruthy();
    expect(appToggle).toBeTruthy();
    expect(appMap).toBeTruthy();
    expect(locateMe).toBeTruthy();
    expect(goButton).toBeTruthy();
  });

});
function setup() {
  const storage = autoSpy(Storage);
  const builder = {
    default() {
      return builder;
    },
    build() {
      return new AboutUsComponent(storage);
    }
  };
  return builder;
}
