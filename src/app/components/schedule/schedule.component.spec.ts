import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { authorizeAndGetEvents } from '../../../assets/calendar';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ScheduleComponent } from './schedule.component';
import {autoSpy} from '../../../../auto-spy';
import { HTTP } from '@ionic-native/http/ngx';

<<<<<<< HEAD
fdescribe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    const a = setup().default();
    TestBed.configureTestingModule({
      declarations: [ ScheduleComponent ],
      imports: [IonicModule.forRoot()]
    }).configureTestingModule({ providers: [
            { provide: Storage, useValue: a.storage },
            { provide: NavController, useValue: a.navCtrl },
        {provide: HttpClient, useValue: a.http} ]}).compileComponents();
=======
describe('ScheduleComponent', () => {
>>>>>>> fb00319b9f1e53e8c62e30710b7812f8072e0981


<<<<<<< HEAD
  it('should create the schedule component', () => {
    const { build } = setup().default();
    const c = build();
    expect(c).toBeTruthy();
=======
    const events = 'data';
    it('should create the schedule component', () => {
      const { build } = setup().default();
      const c = build();
      c.setEvent('party');
      expect(c).toBeTruthy();
>>>>>>> fb00319b9f1e53e8c62e30710b7812f8072e0981
  });

});

function setup() {
<<<<<<< HEAD
        const http = autoSpy(HttpClient);
        const storage = autoSpy(Storage);
        const navCtrl = autoSpy(NavController);
        const builder = {
=======
    const http = autoSpy(HttpClient);
    const storage = autoSpy(Storage);
    const navCtrl = autoSpy(NavController);
    const builder = {
>>>>>>> fb00319b9f1e53e8c62e30710b7812f8072e0981
        http,
        storage,
        navCtrl,
        default() {
            return builder;
        },
        build() {
            return new ScheduleComponent();
        }
    };
    return builder;
}
