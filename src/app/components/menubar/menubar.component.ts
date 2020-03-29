import { Component, OnInit, NgModule } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {

  constructor(
    public navCtrl: NavController,
    private menu: MenuController) { }

  //Method allows user to navigate between pages using menu component
  LoadNewPage(page: string): void {
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
  ngOnInit() {}

}
