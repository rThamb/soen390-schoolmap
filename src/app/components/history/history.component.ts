import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {
      this.storage.get('history').then((hist) => {
        if (hist == null || hist == undefined) {
          this.storage.set('history', JSON.stringify({"dates":[]}));
          console.log(hist)
        } else {
          
          console.log(hist)
        }
      });
  }
}
