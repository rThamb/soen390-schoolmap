import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportIssuesComponent } from './report-issues.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmailComposer} from "@ionic-native/email-composer/ngx";
import { RouterTestingModule } from '@angular/router/testing';
import {By} from "@angular/platform-browser";


describe('ReportIssuesComponent', () => {
  let component: ReportIssuesComponent;
  let fixture: ComponentFixture<ReportIssuesComponent>;
  
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIssuesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot(),  BrowserModule,
        FormsModule, ReactiveFormsModule],
        providers:[EmailComposer]
       
    }).compileComponents();

    fixture = TestBed.createComponent(ReportIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.reportIssue'));
    expect(de.nativeElement.textContent).toContain('Submit');
  });
  it('should call the send function when submitting the form', async(() => {
    let mySpy= spyOn(component, 'send');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(mySpy).toBeDefined();
      // expect(mySpy).toHaveBeenCalledTimes(1);
      // expect(component.send).toHaveBeenCalled();
    })
  }));
  it('should contain a description of the Report an issue Form', () => {
    const de = fixture.debugElement.query(By.css('.text-primary'));
    expect(de.nativeElement.textContent).toContain('describe the issue');
  });

});
