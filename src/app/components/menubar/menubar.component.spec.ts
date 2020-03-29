import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import { MenubarComponent } from './menubar.component';
import {By} from '@angular/platform-browser';
import {autoSpy} from '../../../../auto-spy';


describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  beforeEach(async(() => {
const a = setup().default();
TestBed.configureTestingModule({
      declarations: [ MenubarComponent],
      imports: [RouterTestingModule, IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
       providers: [IonicModule]
    }).configureTestingModule({ providers: [{ provide: NavController, useValue: a.navCtrl },
            { provide: MenuController, useValue: a.menu }] }).compileComponents();

fixture = TestBed.createComponent(MenubarComponent);
component = fixture.componentInstance;
fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if on click redirects user to desired page', async(() => {
    spyOn(component, 'LoadNewPage');
    const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(1)');
    button.click();
    fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/Home');
     });
    const button2 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(2)');
    button2.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/NewRoute');
     });
    const button3 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(3)');
    button3.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/Favorites');
     });
    const button4 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(4)');
    button4.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/ShuttleBusSchedule');
     });
    const button5 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(5)');
    button5.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/Schedule');
     });
    const button6 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(6)');
    button6.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/NearbyPointsOfInterest');
     });
    const button7 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(7)');
    button7.click();
    fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/Settings');
     });
    const button8 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(8)');
    button8.click();
    fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/Safety');
     });
    const button9 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(9)');
    button9.click();
    fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/ReportIssue');
     });
    const button10 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(10)');
    button10.click();
    fixture.whenStable().then(() => {
    expect(component.LoadNewPage).toHaveBeenCalledWith('/AboutUs');
   });
  }));

  it('should contain the name of the application', () => {
    const de = fixture.debugElement.query(By.css('ion-header'));
    expect(de.nativeElement.textContent).toContain('ConcordiaGo');
  });
  it('should contain the menu title', () => {
    const de = fixture.debugElement.query(By.css('ion-menu'));
    expect(de.nativeElement.textContent).toContain('Main Menu');
  });
  it('when LoadNewPage is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const x = c.LoadNewPage('/Home');
    // assert
    expect(x).toHaveBeenCalledWith('/Home');
});

  it('when openFirst is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.openFirst();
    // assert
    // expect(c).toEqual
});

  it('when openEnd is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.openEnd();
    // assert
    // expect(c).toEqual
});

  it('when openCustom is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.openCustom();
    // assert
    // expect(c).toEqual
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



});

function setup() {
    const navCtrl = autoSpy(NavController);
    const menu = autoSpy(MenuController);
    const builder = {
        navCtrl,
        menu,
        default() {
            return builder;
        },
        build() {
            return new MenubarComponent(navCtrl, menu);
        }
    };
    return builder;
}
