import { Component, OnInit } from '@angular/core';
import { authorizeAndGetEvents } from '../../../assets/calendar';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {


  constructor(private http: HttpClient) 
  {
    
  }

  ngOnInit() 
  {
    this.getEvents();
  }

  getEvents()
  {
    // this.http.get('https://www.googleapis.com/calendar/v3/calendars/[CALENDARID]/events?key=[YOUR_API_KEY]').subscribe(data => {
      
    // })
  }

}
