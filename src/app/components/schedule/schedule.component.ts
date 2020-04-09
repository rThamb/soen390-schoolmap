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

  constructor(private http: HttpClient) 
  {
    
  }

  ngOnInit() 
  {
    this.getEvents();
  }

  getEvents()
  {
    this.http.get('http://localhost:3000').subscribe(data => {

      this.events = data;
      console.log(data);

    })
  }

}
