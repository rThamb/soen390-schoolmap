import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafetyComponent } from './safety.component';
import {By} from "@angular/platform-browser";


describe('SafetyComponent', () => {
  let component: SafetyComponent;
  let fixture: ComponentFixture<SafetyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafetyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.title'));
    expect(de.nativeElement.textContent).toContain('YOUR SAFETY');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.p1'));
    expect(de.nativeElement.textContent).toContain('Security');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.title2'));
    expect(de.nativeElement.textContent).toContain('Emergency');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.info'));
    expect(de.nativeElement.textContent).toContain('SafeWalk');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.info'));
    expect(de.nativeElement.textContent).toContain('Assault');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.info'));
    expect(de.nativeElement.textContent).toContain('Injury');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.info'));
    expect(de.nativeElement.textContent).toContain('Theft');
  });

  it('should contain a word describing the app', () => {
    const de = fixture.debugElement.query(By.css('.info'));
    expect(de.nativeElement.textContent).toContain('Hazardous');
  });
});
