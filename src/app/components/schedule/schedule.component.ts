import { Component, OnInit } from '@angular/core';
import { authorizeAndGetEvents } from '../../../assets/calendar';

declare var require: any;
const {spawn} = require('child_process');

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  constructor() 
  {

  }

  ngOnInit() 
  {
    
  }

}
