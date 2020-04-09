import { Component, OnInit } from '@angular/core';
import { authorizeAndGetEvents } from '../../../assets/calendar';
import { HttpClient } from '@angular/common/http';
import { Event } from './Event';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  public events;
  public email: string;
  public today;

  constructor(private http: HttpClient) 
  {
    this.today = Date.now();
    this.getNextEvents();
  }

  ngOnInit() 
  {

  }

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

  goToEventLocation()
  {
    
  }

}
