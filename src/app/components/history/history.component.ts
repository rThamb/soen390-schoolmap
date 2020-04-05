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
          this.getHistory();
          console.log(hist)
        } else {
          
          console.log(hist)
        }
      });
  }

  //Returns the current date in the following format: Day, Month Date, Year
  getDate(): string {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let currentDate  = new Date().toLocaleDateString("en-US", options);
    
    return currentDate
  }

  //initialiazses the structure for the history component to be used
  getHistory(){
    this.storage.get('history').then((hist) => {
      if (hist) {
        let history = JSON.parse(hist)
        this.setCurrentDateInHistory(history)
      } else {
        console.log("No History Stored")
      }
    });
}

  //If the current date is not already stored in the history, store it
  setCurrentDateInHistory(history:JSON):any{
    let length = history["dates"].length
    let date = this.getDate()
    
    if(length === 0){
      history["dates"][0] = {[date]:[{}]}
      this.storage.set('history', JSON.stringify(history));
    }
    else{
      for (var key in history["dates"][length-1]) {
        if(key != date){
          history["dates"][length] = {[date]:[{}]}
          this.storage.set('history', JSON.stringify(history));
        }
        else
          console.log("date already stored at last index: " + (length-1))
      }
    }  
  }

  //Clear the current search history
  clearHistory() {
    if (confirm("Are you sure you would like to clear your search history?") == true) {
      this.storage.remove('history')
      this.ngOnInit()
		}
  }
}
