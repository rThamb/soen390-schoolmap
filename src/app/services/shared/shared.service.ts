import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//This service is used to share data between two unrelated components
export class SharedService {

  constructor() { }

  private message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();
  
  changeMessage(message: string) {
    this.message.next(message)
  }
}
