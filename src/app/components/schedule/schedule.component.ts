import { Component, OnInit } from '@angular/core';
import { authorizeAndGetEvents } from '../../../assets/calendar';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  public events;
  public email: string;
  public today;

  constructor(private http: HttpClient, private storage: Storage, public navCtrl: NavController) 
  {
    this.today = Date.now();
    this.getNextEvents();
  }

  ngOnInit() 
  {

  }

  /**
   * Sends a request to the websever for retrieving upcoming calendar events from the gmail account
   */
  getNextEvents()
  {
    this.http.get('http://localhost:3000/getNextEvents').subscribe(data => {

      console.log(data);
      if(data[0])
      {
        //debugger;
        this.events = data;
        this.email = this.events[0].creator.email;

        for(var i = 0; i < this.events.length; i++){
          if(this.events[i].start.dateTime && this.events[i].end.dateTime)
          {
            this.events[i].start.dateTime = this.events[i].start.dateTime.substr(11,5);
            this.events[i].end.dateTime = this.events[i].end.dateTime.substr(11,5);
          }

        }

      }
      else{
        console.log('No events available');
      }
      
    })
  }

  /**
   * When user clicks on an event, redirects them to the New Route page with the event's location set as the destination. 
   * @param location
   */
  goToEventLocation(location)
  {
    this.storage.ready().then(() => {
      this.storage.set('newRouteDest', location);
    });

    this.navCtrl.navigateRoot('/NewRoute');

    console.log(location);

  }

}
