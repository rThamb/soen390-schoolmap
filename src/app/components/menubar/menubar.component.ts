import { Component, OnInit, NgModule } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



/**
 * Represents the main menu feature of the app
 */
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {


  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    private storage: Storage) {

      this.translatePage();
    }

  // Method allows user to navigate between pages using menu component
  LoadNewPage(page: string): void {
    this.navCtrl.navigateRoot(page);
    this.menu.toggle();
  }

  /**
   * Handles translation of the page
   */
  async translatePage() {
    console.log('languageSet called');
    const res = await fetch('./assets/Languages/language.json');
    const json = await res.json();

    // check if language is english with storage
    this.storage.ready().then(() => {

      this.storage.get('languagePreference').then((lP) => {

      // If no setting has been set, default is english
      if (lP == null) {
        lP = 'English';
        this.storage.set('languagePreference', 'English');
      }
      if( lP === 'English')
      {
        document.getElementById('title').innerHTML = json.english.menubar.title;
        document.getElementById('home').innerHTML = json.english.menubar.home;
        document.getElementById('newroute').innerHTML = json.english.menubar.newRoute;
        document.getElementById('history').innerHTML = json.english.menubar.history;
        document.getElementById('favorites').innerHTML = json.english.menubar.favorites;
        document.getElementById('shuttlebus').innerHTML = json.english.menubar.shuttleBusSchedule;
        document.getElementById('schedule').innerHTML = json.english.menubar.mySchedule;
        document.getElementById('nearbyPOI').innerHTML = json.english.menubar.nearbyPOI;
        document.getElementById('events').innerHTML = json.english.menubar.events;
        document.getElementById('settings').innerHTML = json.english.menubar.settings;
        document.getElementById('safety').innerHTML = json.english.menubar.safety;
        document.getElementById('report').innerHTML = json.english.menubar.reportAnIssue;
        document.getElementById('aboutus').innerHTML = json.english.menubar.aboutUs;
      }
      //check if language is french with storage
      else if (lP == 'French')
      {
        document.getElementById('title').innerHTML = json.french.menubar.title;
        document.getElementById('home').innerHTML = json.french.menubar.home;
        document.getElementById('newroute').innerHTML = json.french.menubar.newRoute;
        document.getElementById('history').innerHTML = json.french.menubar.history;
        document.getElementById('favorites').innerHTML = json.french.menubar.favorites;
        document.getElementById('shuttlebus').innerHTML = json.french.menubar.shuttleBusSchedule;
        document.getElementById('schedule').innerHTML = json.french.menubar.mySchedule;
        document.getElementById('nearbyPOI').innerHTML = json.french.menubar.nearbyPOI;
        document.getElementById('events').innerHTML = json.french.menubar.events;
        document.getElementById('settings').innerHTML = json.french.menubar.settings;
        document.getElementById('safety').innerHTML = json.french.menubar.safety;
        document.getElementById('report').innerHTML = json.french.menubar.reportAnIssue;
        document.getElementById('aboutus').innerHTML = json.french.menubar.aboutUs;
      }

    });

    });
  }


  ngOnInit() {

  }

}
