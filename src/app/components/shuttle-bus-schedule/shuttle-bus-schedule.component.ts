import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-shuttle-bus-schedule',
  templateUrl: './shuttle-bus-schedule.component.html',
  styleUrls: ['./shuttle-bus-schedule.component.scss'],
})
export class ShuttleBusScheduleComponent implements OnInit {
 

  constructor(private httpService: HttpClient) { }
  arro: string [];
  arrt: string [];
  arrth: string [];

  ngOnInit() {
    this.httpService.get('./assets/Shuttlebussched/schedule.json').subscribe(
      data => {
        this.arro = data as string [];  // FILL THE ARRAY WITH DATA.
        console.log(this.arro);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      });
      this.httpService.get('./assets/Shuttlebussched/scheduletwo.json').subscribe(
        data => {
          this.arrt = data as string [];  // FILL THE ARRAY WITH DATA.
          console.log(this.arrt);
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        });
        this.httpService.get('./assets/Shuttlebussched/schedulethree.json').subscribe(
          data => {
            this.arrth = data as string [];  // FILL THE ARRAY WITH DATA.
            console.log(this.arrth);
          },
          (err: HttpErrorResponse) => {
            console.log (err.message);
          });
  }


}
