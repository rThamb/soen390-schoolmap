import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { HistoryComponent} from '../../components/history/history.component'

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  historyComponent: HistoryComponent;

  constructor( private storage: Storage) { }

  //Initializes a users history in the storage on startup
  historyInit() {
    this.storage.get('history').then((hist) => {
      if (hist == null || hist == undefined) {
        this.storage.set('history', JSON.stringify({"dates":[]}));
        this.getHistory();
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
  
}
