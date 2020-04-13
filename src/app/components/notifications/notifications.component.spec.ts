import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { NotificationsComponent } from './notifications.component';
import { autoSpy } from 'auto-spy';
import {By} from '@angular/platform-browser';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async(() => {
const a = setup().default();
TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ],
      imports: [IonicModule.forRoot()],
      providers: [ LocalNotifications]
    }).configureTestingModule({ providers: [{ provide: NavController, useValue: a.navCtrl },
            { provide: Platform, useValue: a.plt },
            { provide: AlertController, useValue: a.alertCtrl },
            { provide: HttpClient, useValue: a.http },
            { provide: Storage, useValue: a.storage }] }).compileComponents();

fixture = TestBed.createComponent(NotificationsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a the able/disable text', () => {
  const de = fixture.debugElement.query(By.css('.lines'));
  expect(de.nativeElement.textContent).toContain('Allow notifications');

  });

  it('when Clicked is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.Clicked();
    // assert
    // tslint:disable-next-line:no-unused-expression
    expect(c).toBeTruthy;
});

  it('when refreshEvents is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.refreshEvents();
    // assert
    // tslint:disable-next-line:no-unused-expression
    expect(c).toBeTruthy;
});

  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    //act
    c.ngOnInit();
   // assert
    // tslint:disable-next-line:no-unused-expression
    expect(c).toBeTruthy;
});

})

function setup() {
    const navCtrl = autoSpy(NavController);
    const plt = autoSpy(Platform);
    const localNotification = autoSpy(LocalNotifications);
    const alertCtrl = autoSpy(AlertController);
    const http = autoSpy(HttpClient);
    const storage = autoSpy(Storage);
    const builder = {
        navCtrl,
        plt,
        localNotification,
        alertCtrl,
        http,
        storage,
        default() {
            return builder;
        },
        build() {
            return new NotificationsComponent(navCtrl, plt, localNotification, alertCtrl, http, storage);
        }
    };
    return builder;
}
