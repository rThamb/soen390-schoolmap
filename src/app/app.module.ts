
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//services
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IndoorPathingService } from './services/indoorPathing/indoor-pathing.service';
import { ReadGridService } from './services/readGrid/read-grid.service' 
import { GpsGridMappingService } from './services/gps-grid-mapping/gps-grid-mapping.service' 
import { BuildingFactoryService } from './services/BuildingFactory/building-factory.service'
import { SharedService } from './services/shared/shared.service' 
import { HistoryService } from './services/history/history.service';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';


//Component imports
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HistoryComponent } from './components/history/history.component';
import { GoButtonComponent } from './components/go-button/go-button.component';
import { HomeSearchComponent } from './components/home-search/home-search.component';
import { MapComponent } from './components/map/map.component';
import { DirectionsComponent } from './components/directions/directions.component';
import { LocateMeComponent } from './components/locate-me/locate-me.component';
import { HomeComponent } from './components/home/home.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { NearbyPointsOfInterestComponent } from './components/nearby-points-of-interest/nearby-points-of-interest.component';
import { NewRouteComponent } from './components/new-route/new-route.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ReportIssuesComponent } from './components/report-issues/report-issues.component';
import { SafetyComponent } from './components/safety/safety.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ShuttleBusScheduleComponent } from './components/shuttle-bus-schedule/shuttle-bus-schedule.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {IonicStorageModule} from '@ionic/storage';
import { EventComponent } from './components/event/event.component';






@NgModule({

  declarations: [AppComponent, MapComponent, GoButtonComponent, HomeComponent, HomeSearchComponent, MenubarComponent, 
                ToggleComponent, LocateMeComponent, NewRouteComponent, AboutUsComponent, HistoryComponent, FavoritesComponent,
                ReportIssuesComponent, SafetyComponent, SettingsComponent, ShuttleBusScheduleComponent, DirectionsComponent,
                NotificationsComponent,EventComponent,ScheduleComponent, NearbyPointsOfInterestComponent],
  entryComponents: [],
  // tslint:disable-next-line:max-line-length
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule, NgxDatatableModule ,IonicStorageModule.forRoot({      name: 'appDB',
  driverOrder: ['sqlite', 'websql', 'indexeddb']})],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    IndoorPathingService,
    HistoryService,
    ReadGridService,
    GpsGridMappingService,
    BuildingFactoryService,
    EmailComposer,
    SharedService,
    LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
