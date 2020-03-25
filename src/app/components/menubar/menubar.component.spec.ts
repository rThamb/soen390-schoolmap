import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import { MenubarComponent } from './menubar.component';

describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubarComponent ],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
      // imports: [IonicModule.forRoot()],
      //providers: [IonicModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO: uncomment the code below and fix routing issue

  // it('should check if on click redirects user to "home" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(1)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/Home" )).toHaveBeenCalled();
  //   })
  // }));
  // it('should check if on click redirects user to "New Route" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(2)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/NewRoute" )).toHaveBeenCalled();
  //   })
  // }));
  // it('should check if on click redirects user to "favourites" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(3)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/Favourites" )).toHaveBeenCalled();
  //   })
  // }));
  // it('should check if on click redirects user to "shuttle schedule" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(4)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/ShuttleBusSchedule" )).toHaveBeenCalled();
  //   })
  // }));
  // it('should check if on click redirects user to "my schedule" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(5)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/Schedule" )).toHaveBeenCalled();
  //   })
  // }));
  // it('should check if on click redirects user to "nearby points of interest" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(6)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/NearbyPointsOfInterest" )).toHaveBeenCalled();
  //   })
  // }));
  // it('should check if on click redirects user to "settings" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(7)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/Settings" )).toHaveBeenCalled();
  //   })
  // }));
  // it('should check if on click redirects user to "safety" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(8)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/Safety" )).toHaveBeenCalled();
  //   })
  // }));
  // it('should check if on click redirects user to "report an issue" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(9)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/ReportIssue" )).toHaveBeenCalled();
  //   })
  // }));
  // it('should check if on click redirects user to "about us" page', async(() => {
  //   spyOn(component, 'LoadNewPage');
  //   let button = fixture.debugElement.nativeElement.querySelector('ion-item:nth-child(10)');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.LoadNewPage("/AboutUs" )).toHaveBeenCalled();
  //   })
  // }));
});
