import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { SettingsComponent } from './settings.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import {By} from '@angular/platform-browser';
import {autoSpy} from '../../../../auto-spy';
import {NavController} from '@ionic/angular';


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

  it('when component is loaded (ngOnInit) it should', async () => {
    
    let storage = TestBed.get(Storage);

    // arrange
    const { build } = setup().default();
    const c = build();
    // act

    let uE;
    storage.ready().then(() => {
      uE = storage.get('useElevator');
    });

    if(c.useElevator == true)
    {
      expect(uE).toBeTruthy();
    }
    else
    {
      expect(uE).toBeFalsy();
    }
    
});

  it('when onChangeSetting is called it should change settings based on user choice', () => {
  // arrange
  const { build } = setup().default();
  const c = build();
  // act
  const useStairs = true;
  spyOn(component, 'onChangeSetting');
  const button = fixture.debugElement.nativeElement.querySelector('ion-toggle:nth-child(1)');
  button.click();
  fixture.whenStable().then(() => {
        expect(component.onChangeSetting).toHaveBeenCalledWith(useStairs);
    });
});

});

function setup() {
    const storage = autoSpy(Storage);
    const navCtrl = autoSpy(NavController);
    const builder = {
        storage,
        default() {
            return builder;
        },
        build() {
            return new SettingsComponent( storage, navCtrl );
        }
    };
    return builder;
}
