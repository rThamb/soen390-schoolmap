import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-calendar-events',
  templateUrl: './my-calendar-events.component.html',
  styleUrls: ['./my-calendar-events.component.scss'],
})
export class MyCalendarEventsComponent implements OnInit {

  public today = "";
  constructor() { }

  ngOnInit() {
    this.today = Date.now();
  }

}
