import { Component, OnInit, NgModule } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';




@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {

  public home: string;

  

  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    private storage: Storage) {}

  //Method allows user to navigate between pages using menu component
  LoadNewPage(page:string): void {
    this.navCtrl.navigateRoot(page);
    this.menu.toggle();
  }

  //MenuBar Methods
  openFirst() {
    
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async languageSet()
  {
    console.log("languageSet called");
    let res = await fetch("./assets/Languages/language.json");
    let json = await res.json();

    //check if language is english with storage
    this.storage.ready().then(() => {
      this.storage.get('languagePreference').then((lP)=> {
        console.log(lP);
        if( lP == 'English')
    {
      this.home = json.english.menubar.home;
      console.log("in english setup");
      document.getElementById("title").innerHTML = json.english.menubar.title;
      document.getElementById("home").innerHTML = json.english.menubar.home;
      document.getElementById("newroute").innerHTML = json.english.menubar.newRoute;
      document.getElementById("favorites").innerHTML = json.english.menubar.favorites;
      document.getElementById("shuttlebus").innerHTML = json.english.menubar.shuttleBusSchedule;
      document.getElementById("schedule").innerHTML = json.english.menubar.mySchedule;
      document.getElementById("nearbyPOI").innerHTML = json.english.menubar.nearbyPOI;
      document.getElementById("settings").innerHTML = json.english.menubar.settings;
      document.getElementById("safety").innerHTML = json.english.menubar.safety;
      document.getElementById("report").innerHTML = json.english.menubar.reportAnIssue;
      document.getElementById("aboutus").innerHTML = json.english.menubar.aboutUs;
    }
    //check if language is french with storage
    else if (lP == 'French')
    {
      console.log("in french setup");
      document.getElementById("title").innerHTML = json.french.menubar.title;
      document.getElementById("home").innerHTML = json.french.menubar.home;
      document.getElementById("newroute").innerHTML = json.french.menubar.newRoute;
      document.getElementById("favorites").innerHTML = json.french.menubar.favorites;
      document.getElementById("shuttlebus").innerHTML = json.french.menubar.shuttleBusSchedule;
      document.getElementById("schedule").innerHTML = json.french.menubar.mySchedule;
      document.getElementById("nearbyPOI").innerHTML = json.french.menubar.nearbyPOI;
      document.getElementById("settings").innerHTML = json.french.menubar.settings;
      document.getElementById("safety").innerHTML = json.french.menubar.safety;
      document.getElementById("report").innerHTML = json.french.menubar.reportAnIssue;
      document.getElementById("aboutus").innerHTML = json.french.menubar.aboutUs;
    }
    });

      })
      
    
  }


  ngOnInit() {
    this.languageSet();
  }

}
