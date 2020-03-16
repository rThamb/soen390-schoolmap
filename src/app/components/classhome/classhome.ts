import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClasshomeComponent } from './classhome.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';

const routes: Routes = [
    {
        path: '',
        component: ClasshomeComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [ClasshomeComponent],
    providers: [ Geolocation ]
})
export class ClassHome {}
