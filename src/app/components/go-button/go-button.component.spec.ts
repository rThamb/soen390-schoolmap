import { NavController } from '@ionic/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GoButtonComponent } from './go-button.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import { autoSpy } from 'auto-spy';

describe('GoButtonComponent', () => {
  let component: GoButtonComponent;
  let fixture: ComponentFixture<GoButtonComponent>;

  beforeEach(async(() => {
const a = setup().default();
TestBed.configureTestingModule({
      declarations: [ GoButtonComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule , IonicModule.forRoot()],
    }).configureTestingModule({ providers: [{ provide: NavController, useValue: a.navCtrl }] }).compileComponents();

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
  it('when LoadNewPage is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.LoadNewPage('/NewRoute');
    // assert
    // expect(c).toEqual
});
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    // expect(c).toEqual
});

});

function setup() {
    const navCtrl = autoSpy(NavController);
    const builder = {
        navCtrl,
        default() {
            return builder;
        },
        build() {
            return new GoButtonComponent(navCtrl);
        }
    };
    return builder;
}
