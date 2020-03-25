import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import { MenubarComponent } from './menubar.component';
import { HomeComponent } from '../home/home.component';

describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubarComponent, HomeComponent ],
      imports: [RouterTestingModule.withRoutes([{path: 'Home', component: HomeComponent}]
      )
        , IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
       providers: [IonicModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if on click redirects user to "home" page', async(() => {
    spyOn(component, 'LoadNewPage');
    const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(1)');
    button.click();

    fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/Home');
     });
  }));
  it('should check if on click redirects user to "New Route" page', async(() => {
    spyOn(component, 'LoadNewPage');
    const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(2)');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/NewRoute');
     });
   }));
  it('should check if on click redirects user to "favourites" page', async(() => {
     spyOn(component, 'LoadNewPage');
     const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(3)');
     button.click();
     fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/Favorites');
     });
   }));
  it('should check if on click redirects user to "shuttle schedule" page', async(() => {
     spyOn(component, 'LoadNewPage');
     const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(4)');
     button.click();
     fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/ShuttleBusSchedule');
     });
   }));
  it('should check if on click redirects user to "my schedule" page', async(() => {
     spyOn(component, 'LoadNewPage');
     const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(5)');
     button.click();

     fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/Schedule');
     });
   }));
  it('should check if on click redirects user to "nearby points of interest" page', async(() => {
     spyOn(component, 'LoadNewPage');
     const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(6)');
     button.click();

     fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/NearbyPointsOfInterest');
     });
   }));
  it('should check if on click redirects user to "settings" page', async(() => {
     spyOn(component, 'LoadNewPage');
     const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(7)');
     button.click();

     fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/Settings');
     });
   }));
  it('should check if on click redirects user to "safety" page', async(() => {
     spyOn(component, 'LoadNewPage');
     const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(8)');
     button.click();

     fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/Safety');
     });
   }));
  it('should check if on click redirects user to "report an issue" page', async(() => {
     spyOn(component, 'LoadNewPage');
     const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(9)');
     button.click();

     fixture.whenStable().then(() => {
       expect(component.LoadNewPage).toHaveBeenCalledWith('/ReportIssue');
     });
   }));
  it('should check if on click redirects user to "about us" page', async(() => {
     spyOn(component, 'LoadNewPage');
     const button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(10)');
     button.click();

     fixture.whenStable().then(() => {
    expect(component.LoadNewPage).toHaveBeenCalledWith('/AboutUs');
   });
}));

});
