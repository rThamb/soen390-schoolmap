import { ToggleComponent } from './components/toggle/toggle.component';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// services
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IndoorPathingService } from './services/indoorPathing/indoor-pathing.service';
import { ReadGridService } from './services/readGrid/read-grid.service';
import { GpsGridMappingService } from './services/gps-grid-mapping/gps-grid-mapping.service';



// Component imports
import { MapComponent } from './components/map/map.component';

import { LocateMeComponent } from './components/locate-me/locate-me.component';
import { HomeComponent } from './components/home/home.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { NewRouteComponent } from './components/new-route/new-route.component';
import {ClasshomeComponent} from './components/classhome/classhome.component';






@NgModule({

  declarations: [AppComponent, MapComponent, HomeComponent, MenubarComponent, ToggleComponent, LocateMeComponent, NewRouteComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule],
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
