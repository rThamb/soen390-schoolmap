import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewRouteComponent } from './components/new-route/new-route.component';

const routes: Routes = [
 /*
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  */
   {path: '', component: HomeComponent},
   {path: 'home', component: HomeComponent},
   {path: 'NewRoute', component: NewRouteComponent},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
