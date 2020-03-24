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
    expect(de.nativeElement.textContent).toContain('Issue');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.reportIssue'));
    expect(de.nativeElement.textContent).toContain('describe');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.reportIssue'));
    expect(de.nativeElement.textContent).toContain('Submit');
  });

});
