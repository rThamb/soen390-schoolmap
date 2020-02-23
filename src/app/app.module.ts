import { ToggleComponent } from './components/toggle/toggle.component';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IndoorPathingService } from './services/indoor-pathing.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapComponent } from './components/map/map.component';
import { DirectionControlsComponent } from './components/direction-controls/direction-controls.component';
import { LocateMeComponent } from './components/locate-me/locate-me.component';
import { HomeComponent } from './components/home/home.component'
import { MenubarComponent } from './components/menubar/menubar.component';
import { ShapesComponent } from './components/shapes/shapes.component';





@NgModule({
  declarations: [AppComponent, MapComponent, DirectionControlsComponent, HomeComponent, MenubarComponent, ToggleComponent, LocateMeComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    IndoorPathingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}