import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewRouteComponent } from './components/new-route/new-route.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NearbyEventsComponent } from './components/nearby-events/nearby-events.component';
import { NearbyRestaurantsComponent } from './components/nearby-restaurants/nearby-restaurants.component';
import { ReportIssuesComponent } from './components/report-issues/report-issues.component';
import { SafetyComponent } from './components/safety/safety.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ShuttleBusScheduleComponent } from './components/shuttle-bus-schedule/shuttle-bus-schedule.component';

const routes: Routes = [
 /*
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  */
   {path: '', component: HomeComponent},
   {path: 'Home', component: HomeComponent},
   {path: 'NewRoute', component: NewRouteComponent},
   {path: 'AboutUs', component: AboutUsComponent},
   {path: 'NearbyEvents', component: NearbyEventsComponent},
   {path: 'NearbyRestaurants', component: NearbyRestaurantsComponent},
   {path: 'ReportIssue', component: ReportIssuesComponent},
   {path: 'Safety', component: SafetyComponent},
   {path: 'Schedule', component: ScheduleComponent},
   {path: 'Settings', component: SettingsComponent},
   {path: 'ShuttleBusSchedule', component: ShuttleBusScheduleComponent},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
