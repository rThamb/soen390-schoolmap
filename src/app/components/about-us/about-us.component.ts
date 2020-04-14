import {
  Component,
  OnInit
} from '@angular/core';
import {
  Storage
} from '@ionic/storage';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.translatePage();
  }

  // Handles translating content on the page depending on languagePreference value set in storage.
  async translatePage() {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    await this.storage.ready().then(() => {
      this.storage.get('languagePreference').then((lP) => {

        // Check if variable has been set by user, else set English as default
        if (lP == null) {
          lP = 'English';
          this.storage.set('languagePreference', 'English');
        }
        if (lP == 'English') {
          document.getElementById('infoAboutUs').innerHTML = json.english.aboutUs.info;
        } else if (lP == 'French') {
          document.getElementById('infoAboutUs').innerHTML = json.french.aboutUs.info;
        }

      });
    })
  }

}