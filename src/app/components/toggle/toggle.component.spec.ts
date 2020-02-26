import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToggleComponent } from './toggle.component';
import {MapComponent} from '../map/map.component';
import { NgModule } from '@angular/core';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleComponent, MapComponent ],
      imports: [IonicModule.forRoot(), NgModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
