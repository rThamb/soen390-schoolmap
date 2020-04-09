import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
toggleval:boolean=false;

  constructor() {
    
   }
   Clicked(){
     this.toggleval=!this.toggleval;
   }
   
  ngOnInit() {}
  
}
