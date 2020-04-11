import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { ReportIssuesComponent } from './report-issues.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {By} from '@angular/platform-browser';
import {IonicStorageModule} from '@ionic/storage';

fdescribe('ReportIssuesComponent', () => {
  let component: ReportIssuesComponent;
  let fixture: ComponentFixture<ReportIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIssuesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicStorageModule.forRoot(),  BrowserModule,
        FormsModule, ReactiveFormsModule],
        providers: [EmailComposer]

    }).compileComponents();

    fixture = TestBed.createComponent(ReportIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the report-issue component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a submit button', () => {
    const de = fixture.debugElement.query(By.css('.reportIssue'));
    expect(de.nativeElement.textContent).toContain('Submit');
  });

  it('should call the send function when submitting the form', async(() => {
    const mySpy = spyOn(component, 'send');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(mySpy).toBeDefined();
    });
  }));
  it('should contain a description of the Report an issue Form', () => {
    const de = fixture.debugElement.query(By.css('.text-primary'));
    expect(de.nativeElement.textContent).toContain('describe the issue');
  });

});
