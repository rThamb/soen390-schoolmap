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
    // tslint:disable-next-line:prefer-const
    let component: ScheduleComponent;
    // tslint:disable-next-line:prefer-const
    let fixture: ComponentFixture<ScheduleComponent>;

    beforeEach(async(() => {
        const a = setup().default();
        TestBed.configureTestingModule({
            declarations: [ScheduleComponent],
            imports: [IonicModule.forRoot()]
        }).configureTestingModule({
            providers: [
                {provide: Storage, useValue: a.storage},
                {provide: NavController, useValue: a.navCtrl},
                {provide: HttpClient, useValue: a.http}]
        }).compileComponents();
    }));


    const events = 'data';
    it('translate the page ', () => {
            const {build} = setup().default();
            const c = build();

            const spyTemp = spyOn(c, 'translatePage');
            c.translatePage();
            expect(spyTemp).toHaveBeenCalled();
        });

    it('translate the page ', () => {
            const {build} = setup().default();
            const c = build();

            const spyTemp = spyOn(c, 'translatePage');
            c.translatePage();
            expect(spyTemp).toHaveBeenCalled();
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
                return new ScheduleComponent(http,storage,navCtrl);
            }
        };
        return builder;
    }
