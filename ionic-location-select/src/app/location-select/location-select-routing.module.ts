import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationSelectPage } from './location-select.page';

const routes: Routes = [
  {
    path: '',
    component: LocationSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationSelectPageRoutingModule {}
