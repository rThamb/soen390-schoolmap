import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NewRouteComponent } from './new-route.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {autoSpy} from '../../../../auto-spy';
import {Storage} from '@ionic/storage';
import {AboutUsComponent} from '../about-us/about-us.component';
import { By } from '@angular/platform-browser';

describe('NewRouteComponent', () => {
  let component: NewRouteComponent;
  let fixture: ComponentFixture<NewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRouteComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all UI elements to the screen', () => {
    fixture.autoDetectChanges();
    let el = fixture.debugElement.query(By.all());
    console.log(el);
    expect(el).toBeTruthy();
  });
});
