import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  historyDates = []
  historyLocations = []
  historyDisplay: any = {}
  constructor(private storage: Storage) { }

  ngOnInit() {
      this.storage.get('history').then((hist) => {
        if (hist == null || hist == undefined) {
          this.storage.set('history', JSON.stringify({"dates":[]}));
          this.getHistory();
        } 
        else {
          let history = JSON.parse(hist)
          let numDates = (history["dates"].length) - 1

          while(numDates != -1) {
            this.createHistory(numDates)
            numDates--
          }
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

  async createHistory(index:number){
    let history = await this.storage.get('history').catch((error) => {
      console.log('Error getting history', error);
    });

    history = JSON.parse(history)
    let numDates = history["dates"].length
    this.historyLocations = []
  
    let date = Object.keys(history["dates"][index])[0]
    let locationsIndex = history["dates"][index][date].length
    this.historyDates.push(date)
    
    for(var j = locationsIndex - 1; j >= 0; j--){
      let start = history["dates"][index][date][j].Start
      let dest = history["dates"][index][date][j].Destinations
      let location = "Start: <strong>" + start + "</strong><br />Destination: <strong>" + dest +"</strong>"
      this.historyLocations.push(location)
    }
    this.historyDisplay[date] = this.historyLocations
  }

  // async createHistory(){
  //   let history = await this.storage.get('history').catch((error) => {
  //     console.log('Error getting history', error);
  //   });

  //   history = JSON.parse(history)
  //   let numDates = history["dates"].length
    
  //   for(var i = numDates -1; i >= 0; i--){
  //     let date = Object.keys(history["dates"][i])[0]
  //     let locationsIndex = history["dates"][i][date].length
  //     this.historyDates.push(date)
      
  //     for(var j = locationsIndex - 1; j >= 0; j--){
  //       let start = history["dates"][i][date][j].Start
  //       let dest = history["dates"][i][date][j].Destinations
  //       let location = "Start: " + start + "<br />Destination: "+dest
        
  //       this.historyLocations.push(location)
  //     }
  //     //this.historyLocations = []
  //     console.log(this.historyDisplay)
  //   }
  // }

  //Clear the current search history
  clearHistory() {
    if (confirm("Are you sure you would like to clear your search history?") == true) {
      this.storage.remove('history')
      this.ngOnInit()
		}
  }
}
