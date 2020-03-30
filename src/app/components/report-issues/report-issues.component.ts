import { Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import {AlertController} from "@ionic/angular";


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


  constructor( private formBuilder: FormBuilder, private emailComposer: EmailComposer, private alertCtrl: AlertController) {
    this.issue = this.formBuilder.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
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

}
