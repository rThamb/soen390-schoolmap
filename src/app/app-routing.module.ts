import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MapComponent } from './components/map/map.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ShapesComponent } from './components/shapes/shapes.component';
import { DirectionControlsComponent } from './components/direction-controls/direction-controls.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component'


const routes: Routes = [
 /*
  {
    path: '', 
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  */
   {path: '', component: HomeComponent},
   {path: "dir", component: DirectionControlsComponent},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
