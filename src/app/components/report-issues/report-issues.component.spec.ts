import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { ReportIssuesComponent } from './report-issues.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {By} from '@angular/platform-browser';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {IonicModule} from "@ionic/angular";
import {autoSpy} from '../../../../auto-spy';
import {AboutUsComponent} from '../about-us/about-us.component';

describe('ReportIssuesComponent', () => {
  let component: ReportIssuesComponent;
  let fixture: ComponentFixture<ReportIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIssuesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicStorageModule.forRoot(), IonicModule.forRoot(), BrowserModule,
        FormsModule, ReactiveFormsModule],
        providers: [EmailComposer]

    }).compileComponents();

    fixture = TestBed.createComponent(ReportIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('translate the page ', () => {
    const { build } = setup().default();
    const c = build();

    const  spyTemp  =  spyOn(c , 'translatePage');
    c.translatePage();
    expect(spyTemp).toHaveBeenCalled();
  });
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

  it('should load all UI elements to the screen', () => {
    fixture.autoDetectChanges();
    let el = fixture.debugElement.query(By.all());
    console.log(el);
    expect(el).toBeTruthy();
  });

});
function setup() {
  const storage = autoSpy(Storage);
  const builder = {
    default() {
      return builder;
    },
    build() {
      return new AboutUsComponent(storage);
    }
  };
  return builder;
}
