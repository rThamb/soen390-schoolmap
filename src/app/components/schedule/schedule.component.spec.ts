import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ScheduleComponent } from './schedule.component';
import {autoSpy} from '../../../../auto-spy';
import { HTTP } from '@ionic-native/http/ngx';
import {IonicStorageModule} from '@ionic/storage';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';



describe('ScheduleComponent', () => {

    let fixture, component;


beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [ScheduleComponent],
                    imports: [IonicModule.forRoot(), IonicStorageModule.forRoot(), RouterModule.forRoot([]), HttpClientModule]
                }).configureTestingModule({
                    providers: [HttpClient]
                }).compileComponents();
                fixture = TestBed.createComponent(ScheduleComponent);
                component = fixture.componentInstance;
            });


            it('should create the component', () => {
                let component = TestBed.createComponent(ScheduleComponent).componentInstance;
                
                expect(component).toBeTruthy();

            });

            it('should load all UI elements to the screen', () => {
                fixture.autoDetectChanges();
                let el = fixture.debugElement.query(By.all());
                console.log(el);
                expect(el).toBeTruthy();
              });




});


