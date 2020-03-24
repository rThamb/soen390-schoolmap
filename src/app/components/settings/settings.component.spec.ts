import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SettingsComponent } from './settings.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import { IonicStorageModule } from '@ionic/storage';
import {By} from "@angular/platform-browser";


describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicStorageModule.forRoot(),IonicModule.forRoot()]
      
    }).compileComponents();



    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.settings'));
    expect(de.nativeElement.textContent).toContain('Settings');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.settings'));
    expect(de.nativeElement.textContent).toContain('Language');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.settings'));
    expect(de.nativeElement.textContent).toContain('Preferences');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.settings'));
    expect(de.nativeElement.textContent).toContain('Accessibility');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.NestedList'));
    expect(de.nativeElement.textContent).toContain('Elevators');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.settings'));
    expect(de.nativeElement.textContent).toContain('Stairs');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.settings'));
    expect(de.nativeElement.textContent).toContain('Escalators');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.settings'));
    expect(de.nativeElement.textContent).toContain('Calendar');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.settings'));
    expect(de.nativeElement.textContent).toContain('Notifications');
  });
});
