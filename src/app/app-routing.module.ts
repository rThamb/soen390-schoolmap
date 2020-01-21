import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { DirectionControlsComponent } from './components/direction-controls/direction-controls.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
   {path: "map", component: MapComponent},
   {path: "dir", component: DirectionControlsComponent},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
