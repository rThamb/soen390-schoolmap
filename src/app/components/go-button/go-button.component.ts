import { Component, OnInit, NgModule } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-go-button',
  templateUrl: './go-button.component.html',
  styleUrls: ['./go-button.component.scss'],
})
export class GoButtonComponent implements OnInit {

  constructor(
    public navCtrl: NavController
  ) {}

  // Method allows user to navigate to New Route
  LoadNewPage(page: string): void {
    this.navCtrl.navigateRoot(page);
  }

  ngOnInit() {}

}
