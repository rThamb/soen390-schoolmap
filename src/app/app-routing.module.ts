import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Component imports for routing
import { AboutUsComponent } from './components/about-us/about-us.component';
//import { FavoritesComponent } from './components/favorites/favorites.component';
// import { FavoritesComponent } from './components/favorites/favorites.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
// import { NearbyPointsOfInterestComponent } from './components/nearby-points-of-interest/nearby-points-of-interest.component';
import { NewRouteComponent } from './components/new-route/new-route.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ReportIssuesComponent } from './components/report-issues/report-issues.component';
import { SafetyComponent } from './components/safety/safety.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ShuttleBusScheduleComponent } from './components/shuttle-bus-schedule/shuttle-bus-schedule.component';
import { EventComponent } from './components/event/event.component';


const routes: Routes = [
 /*
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  */
   {path: '', component: HomeComponent},
  // {path: 'Favorites', component: FavoritesComponent},
   {path: 'History', component: HistoryComponent},
   {path: 'Home', component: HomeComponent},
   // {path: 'NearbyPointsOfInterest', component: NearbyPointsOfInterestComponent},
   {path: 'NewRoute', component: NewRouteComponent},
   {path: 'Notifications', component: NotificationsComponent},
   {path: 'AboutUs', component: AboutUsComponent},
   {path: 'ReportIssue', component: ReportIssuesComponent},
   {path: 'Safety', component: SafetyComponent},
   {path: 'Schedule', component: ScheduleComponent},
   {path: 'Settings', component: SettingsComponent},
   {path: 'ShuttleBusSchedule', component: ShuttleBusScheduleComponent},
<<<<<<< HEAD
   {path: 'EventOnCampus', component: EventComponent}
=======

>>>>>>> googleCalendar

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
