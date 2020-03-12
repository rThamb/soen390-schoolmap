import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//services
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IndoorPathingService } from './services/indoorPathing/indoor-pathing.service';
import { ReadGridService } from './services/readGrid/read-grid.service' 
import { GpsGridMappingService } from './services/gps-grid-mapping/gps-grid-mapping.service' 



//Component imports
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { LocateMeComponent } from './components/locate-me/locate-me.component';
import { MapComponent } from './components/map/map.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { NearbyEventsComponent } from './components/nearby-events/nearby-events.component';
import { NearbyRestaurantsComponent } from './components/nearby-restaurants/nearby-restaurants.component';
import { NewRouteComponent } from './components/new-route/new-route.component';
import { ReportIssuesComponent } from './components/report-issues/report-issues.component';
import { SafetyComponent } from './components/safety/safety.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ShuttleBusScheduleComponent } from './components/shuttle-bus-schedule/shuttle-bus-schedule.component';
import { ToggleComponent } from './components/toggle/toggle.component';






@NgModule({

  declarations: [AppComponent, MapComponent, HomeComponent, MenubarComponent, ToggleComponent, LocateMeComponent, 
                NewRouteComponent, AboutUsComponent, NearbyEventsComponent, NearbyRestaurantsComponent, ReportIssuesComponent,
                SafetyComponent, ScheduleComponent, SettingsComponent, ShuttleBusScheduleComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    IndoorPathingService,
    ReadGridService,
    GpsGridMappingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}