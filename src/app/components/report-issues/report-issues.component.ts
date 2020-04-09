import { Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import {AlertController} from "@ionic/angular";


import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-report-issues',
  templateUrl: './report-issues.component.html',
  styleUrls: ['./report-issues.component.scss'],

})
export class ReportIssuesComponent {

  sender: '';
  subject: '';
  body: '';

  private issue : FormGroup;


  constructor( private formBuilder: FormBuilder, private emailComposer: EmailComposer, private alertCtrl: AlertController, private storage:Storage) {
    this.issue = this.formBuilder.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.translatePage();
  }

  send() {

    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
      }
    });

    let email = {
      to: 'mapsconcordia1@gmail.com',
      cc: [],
      bcc: [],
      sender: this.sender,
      subject: this.subject,
      body: this.body,
      isHtml: true,
      app: "Gmail"
    };

    console.log(this.issue.value);
    // Send a text message using default options
       this.emailComposer.open(email);

    // create pop up for user to tell them we received their message
      const alert: any = this.alertCtrl.create({
        header: 'Thank you for your feedback',
        message: 'Our team will look into the issue you have reported asap!',
        buttons: [
          {
            text: 'Okay',
            role: 'Okay',
            handler: data => {
              location.reload()
            }
          },]
      });
      alert.then((_alert: any)=> {
        _alert.present();
      })

  }

  async translatePage()
  {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    this.storage.ready().then(() => {
      this.storage.get('languagePreference').then((lP) => {

        if(lP == null)
        {
          lP = 'English';
          this.storage.set('languagePreference', 'English');
        }

        if(lP === 'English')
        {
          document.getElementById('reportTitle').innerHTML = json.english.report.title;
          document.getElementById('reportParagraph').innerHTML = json.english .report.description;
          document.getElementById('email').setAttribute('placeholder', json.english.placeholders.email);
          document.getElementById('subject').setAttribute('placeholder', json.english.placeholders.Subject);
          document.getElementById('body').setAttribute('placeholder', json.english.placeholders.Message);


        }
        else if(lP === 'French')
        {
          document.getElementById('reportTitle').innerHTML = json.french.report.title;
          document.getElementById('reportParagraph').innerHTML = json.french.report.description;
          document.getElementById('email').setAttribute('placeholder', json.french.placeholders.email);
          document.getElementById('subject').setAttribute('placeholder', json.french.placeholders.Subject);
          document.getElementById('body').setAttribute('placeholder', json.french.placeholders.Message);
        }
      });
    });
  }

}
