import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { SafetyComponent } from './safety.component';
import {By} from '@angular/platform-browser';
import {autoSpy} from '../../../../auto-spy';
import { IonicStorageModule } from '@ionic/storage';


describe('SafetyComponent', () => {
  let component: SafetyComponent;
  let fixture: ComponentFixture<SafetyComponent>;

  beforeEach(async(() => {
    const a = setup().default();
    TestBed.configureTestingModule({
      declarations: [ SafetyComponent ],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()  ]
    }).compileComponents();

    fixture = TestBed.createComponent(SafetyComponent);
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
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('translate the page ', () => {
    const { build } = setup().default();
    const c = build();

    const  spyTemp  =  spyOn(c , 'translatePage');
    c.translatePage();
    expect(spyTemp).toHaveBeenCalled();
  });
  it('should contain information and phone numbers for different emergencies', () => {
    const de = fixture.debugElement.query(By.css('.title'));
    expect(de.nativeElement.textContent).toContain('YOUR SAFETY');

    const de1 = fixture.debugElement.query(By.css('.p1'));
    expect(de1.nativeElement.textContent).toContain('Security');

    const de0 = fixture.debugElement.query(By.css('.b:nth-child(1)'));
    expect(de0.nativeElement.textContent).toContain('Please call Security at');

    const de2 = fixture.debugElement.query(By.css('.title2'));
    expect(de2.nativeElement.textContent).toContain('Emergency');

    const de3 = fixture.debugElement.query(By.css('.info'));
    expect(de3.nativeElement.textContent).toContain('SafeWalk');

    const de4 = fixture.debugElement.query(By.css('.info'));
    expect(de4.nativeElement.textContent).toContain('Assault');

    const de5 = fixture.debugElement.query(By.css('.info'));
    expect(de5.nativeElement.textContent).toContain('Injury');

    const de35 = fixture.debugElement.query(By.css('.info'));
    expect(de35.nativeElement.textContent).toContain('514-848-3717');

    const de6 = fixture.debugElement.query(By.css('.info'));
    expect(de6.nativeElement.textContent).toContain('Hazardous');

    const de36 = fixture.debugElement.query(By.css('.info'));
    expect(de36.nativeElement.textContent).toContain('option 1');

    const de7 = fixture.debugElement.query(By.css('.info'));
    expect(de7.nativeElement.textContent).toContain('Theft');

    const de37 = fixture.debugElement.query(By.css('.info'));
    expect(de37.nativeElement.textContent).toContain('option 2');

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
            return new SafetyComponent(storage);
        }
    };
    return builder;
}
