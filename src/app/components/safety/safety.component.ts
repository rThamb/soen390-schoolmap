import {
  Component,
  OnInit
} from '@angular/core';
import {
  Storage
} from '@ionic/storage';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.scss'],
})
export class SafetyComponent implements OnInit {

  constructor(private storage: Storage) {
    this.translatePage();
  }

  ngOnInit() {}

  /**
   * Handles translation of the page
   */
  async translatePage() {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    this.storage.ready().then(() => {

      this.storage.get('languagePreference').then((lP) => {

        // If no setting has been set, default is english
        if (lP == null) {
          lP = 'English';
          this.storage.set('languagePreference', 'English');
        }
        if (lP === 'English') {
          document.getElementById('safetyTitle').innerHTML = json.english.safety.title;
          document.getElementById('safetyText1').innerHTML = json.english.safety.text1;
          document.getElementById('safetyText2').innerHTML = json.english.safety.text2;
          document.getElementById('safetyText3').innerHTML = json.english.safety.text3;
          document.getElementById('safetyTitle2').innerHTML = json.english.safety.emergencyNum;
          document.getElementById('option1').innerHTML = json.english.safety.option1;
          document.getElementById('option2').innerHTML = json.english.safety.option2;
          document.getElementById('option3').innerHTML = json.english.safety.option3;
          document.getElementById('option4').innerHTML = json.english.safety.option4;
          document.getElementById('option5').innerHTML = json.english.safety.option5;
        } else if (lP === 'French') {
          document.getElementById('safetyTitle').innerHTML = json.french.safety.title;
          document.getElementById('safetyText1').innerHTML = json.french.safety.text1;
          document.getElementById('safetyText2').innerHTML = json.french.safety.text2;
          document.getElementById('safetyText3').innerHTML = json.french.safety.text3;
          document.getElementById('safetyTitle2').innerHTML = json.french.safety.emergencyNum;
          document.getElementById('option1').innerHTML = json.french.safety.option1;
          document.getElementById('option2').innerHTML = json.french.safety.option2;
          document.getElementById('option3').innerHTML = json.french.safety.option3;
          document.getElementById('option4').innerHTML = json.french.safety.option4;
          document.getElementById('option5').innerHTML = json.french.safety.option5;
        }


      });
    });
  }

}