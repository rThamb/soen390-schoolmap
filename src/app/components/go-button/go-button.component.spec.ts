import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GoButtonComponent } from './go-button.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('GoButtonComponent', () => {
  let component: GoButtonComponent;
  let fixture: ComponentFixture<GoButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoButtonComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule , IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.locatebut'));
    expect(de.nativeElement.textContent).toContain('GO');
  });

  it('should check if on click redirects user to "New Route" page', async(() => {
  spyOn(component, 'LoadNewPage');
  const button = fixture.debugElement.nativeElement.querySelector('ion-fab-button');
  button.click();

  fixture.whenStable().then(() => {
      expect(component.LoadNewPage).toHaveBeenCalledWith('/NewRoute');
    });
  }));
});
