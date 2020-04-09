import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {HistoryService} from '../../services/history/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  historyDates = []
  historyLocations = []
  historyDisplay: any = {}
  constructor(private storage: Storage, private historyService: HistoryService) { }

  ngOnInit() {
    this.storage.get('history').then((hist) => {
      if (hist == null || hist == undefined) {
        this.historyService.historyInit()
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

  /*
  *Used to Containt the follwing methods, which have been moved to the HistoryService
  *
  *-getHistory()
  *-setCurrentDateInHistory()
  *
  */

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

  //Clear the current search history
  clearHistory() {
    if (confirm("Are you sure you would like to clear your search history?") == true) {
      // this.storage.remove('history')
      // this.ngOnInit()
		}
  }
}
