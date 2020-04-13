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

describe('ScheduleComponent', () => {


    const events = 'data';
    it('should create the schedule component', () => {
      const { build } = setup().default();
      const c = build();
      c.setEvent('party');
      expect(c).toBeTruthy();
  });

});

function setup() {
    const http = autoSpy(HttpClient);
    const storage = autoSpy(Storage);
    const navCtrl = autoSpy(NavController);
    const builder = {
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
