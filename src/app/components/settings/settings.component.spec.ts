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

  it('should contain 6 items', () => {
    const de = fixture.debugElement.query(By.css('.settings'));
    expect(de.nativeElement.textContent).toContain('Settings');
    expect(de.nativeElement.textContent).toContain('Language');
    expect(de.nativeElement.textContent).toContain('Preferences');
    expect(de.nativeElement.textContent).toContain('Accessibility');
    expect(de.nativeElement.textContent).toContain('Elevators');
    expect(de.nativeElement.textContent).toContain('Stairs');
    expect(de.nativeElement.textContent).toContain('Escalators');
    expect(de.nativeElement.textContent).toContain('Calendar');
    expect(de.nativeElement.textContent).toContain('Notifications');
  });
});
