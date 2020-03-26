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

  it('should contain phone numbers for different emergencies', () => {
    const de = fixture.debugElement.query(By.css('.title'));
    expect(de.nativeElement.textContent).toContain('YOUR SAFETY');

    const de1 = fixture.debugElement.query(By.css('.p1'));
    expect(de1.nativeElement.textContent).toContain('Security');

    const de2 = fixture.debugElement.query(By.css('.title2'));
    expect(de2.nativeElement.textContent).toContain('Emergency');

    const de3 = fixture.debugElement.query(By.css('.info'));
    expect(de3.nativeElement.textContent).toContain('SafeWalk');

    const de4 = fixture.debugElement.query(By.css('.info'));
    expect(de4.nativeElement.textContent).toContain('Assault');

    const de5 = fixture.debugElement.query(By.css('.info'));
    expect(de5.nativeElement.textContent).toContain('Injury');

    const de6 = fixture.debugElement.query(By.css('.info'));
    expect(de6.nativeElement.textContent).toContain('Hazardous');

    const de7 = fixture.debugElement.query(By.css('.info'));
    expect(de7.nativeElement.textContent).toContain('Theft');

  });
});
