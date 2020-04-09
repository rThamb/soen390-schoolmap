import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
toggleval:boolean=false;
timesel:number=15;

  constructor() {
    
    
   }
   Clicked(){
     this.toggleval=!this.toggleval;
   }
   onChange(value){
    this.timesel=value;
    console.log(this.timesel);
  }
  ngOnInit() {}
  
}
