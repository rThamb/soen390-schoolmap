import { Component, OnInit } from '@angular/core';
import { DataService} from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
this.dataService.getLocalData().subscribe(data => {
  console.log('Local Data:');
  console.log(data);
});

  }
}
