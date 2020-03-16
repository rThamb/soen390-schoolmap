import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationSelectPageRoutingModule } from './location-select-routing.module';

import { LocationSelectPage } from './location-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationSelectPageRoutingModule
  ],
  declarations: [LocationSelectPage]
})
export class LocationSelectPageModule {}
