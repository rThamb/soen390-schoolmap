import { Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-report-issues',
  templateUrl: './report-issues.component.html',
  styleUrls: ['./report-issues.component.scss'],

})
export class ReportIssuesComponent {

  private issue : FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.issue = this.formBuilder.group({
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  ReportAnIssueForm(){
    //TODO store user input in a file instead of saving it in console
    //this is only for testing--- to be removed
    console.log(this.issue.value)
  }

}
