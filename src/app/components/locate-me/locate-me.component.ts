import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-locate-me',
  templateUrl: './locate-me.component.html',
  styleUrls: ['./locate-me.component.scss'],
})
export class LocateMeComponent implements OnInit {

  @Output() locateevent=new EventEmitter();
  constructor() { }

  ngOnInit() {}
  callparentlocate(){
    this.locateevent.emit();
  }

}
