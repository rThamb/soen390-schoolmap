import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import { MenubarComponent } from './menubar.component';
import {By} from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';

describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubarComponent],
      imports: [RouterTestingModule, IonicStorageModule.forRoot(), IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
       providers: [IonicModule]
    }).compileComponents();

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
      expect(component.LoadNewPage).toHaveBeenCalledWith('/NewRoute');
     });
    const button4 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(4)');
    button4.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/Favorites');
     });
    const button5 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(5)');
    button5.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/ShuttleBusSchedule');
     });
    const button6 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(6)');
    button6.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/Schedule');
     });
    const button7 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(7)');
    button7.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/NearbyPointsOfInterest');
     });
    const button8 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(8)');
    button8.click();
    fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/EventOnCampus');
      });

    const button9 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(9)');
    button9.click();
    fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/Settings');
     });
    const button10 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(10)');
    button10.click();
    fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/Safety');
     });
    const button11 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(11)');
    button11.click();
    fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/ReportIssue');
     });
    const button12 = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(12)');
    button12.click();
    fixture.whenStable().then(() => {
    expect(component.LoadNewPage).toHaveBeenCalledWith('/AboutUs');
   });
  }));

  it('should contain the name of the application', () => {
    const de = fixture.debugElement.query(By.css('ion-title:nth-child(2)'));
    expect(de.nativeElement.textContent).toContain('ConcordiaGo');
  });
  it('should contain the menu title', () => {
    const de = fixture.debugElement.query(By.css('ion-title:nth-child(1)'));
    expect(de.nativeElement.textContent).toContain('Main Menu');
  });


});
