import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { SettingsComponent } from './settings.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import {By} from '@angular/platform-browser';
import {autoSpy} from '../../../../auto-spy';


describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
const a = setup().default();
TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicStorageModule.forRoot(), IonicModule.forRoot()]

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
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    expect(c.ngOnInit()).toBeTruthy();
});

  it('when onChangeSetting is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    let useStairs = true;
    // act
    const x = c.onChangeSetting('useStairs', useStairs);
    // assert
    expect(x).toBeDefined();
});

});

function setup() {
    const storage = autoSpy(Storage);
    const builder = {
        storage,
        default() {
            return builder;
        },
        build() {
            return new SettingsComponent( storage );
        }
    };
    return builder;
}
