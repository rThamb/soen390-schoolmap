import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocateMeComponent } from './locate-me.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {autoSpy} from '../../../../auto-spy';
import {Storage} from '@ionic/storage';
import {AboutUsComponent} from '../about-us/about-us.component';

describe('LocateMeComponent', () => {
  let component: LocateMeComponent;
  let fixture: ComponentFixture<LocateMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateMeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocateMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the function callparentlocate() when user click on locate me button', async(() => {
    spyOn(component, 'callparentlocate');
    const button = fixture.debugElement.nativeElement.querySelector('ion-fab-button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.callparentlocate()).toBeTruthy();
    });
  }));

});

