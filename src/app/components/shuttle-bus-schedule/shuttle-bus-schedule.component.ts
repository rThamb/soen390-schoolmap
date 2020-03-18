import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import data from '../../../assets/Shuttlebussched/schedule.json';

@Component({
  selector: 'app-shuttle-bus-schedule',
  templateUrl: './shuttle-bus-schedule.component.html',
  styleUrls: ['./shuttle-bus-schedule.component.scss'],
})
export class ShuttleBusScheduleComponent implements OnInit {
 
tableStyle='bootstrap';
  constructor() { 
    console.log(this.arro);
  }
  arro=data.monday;
  arr1=data.friday;
  
  

  ngOnInit() {

  }
  changeStyle(){
    if (this.tableStyle=='bootstrap')
    this.tableStyle='dark';
    else if (this.tableStyle=='dark')
    this.tableStyle='bootstrap';
    
  }


}
