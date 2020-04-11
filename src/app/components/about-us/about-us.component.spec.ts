import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AboutUsComponent } from './about-us.component';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {autoSpy} from '../../../../auto-spy';
import {Storage} from '@ionic/storage';


describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async(() => {
const a = setup().default();
TestBed.configureTestingModule({
      declarations: [ AboutUsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

fixture = TestBed.createComponent(AboutUsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // covering both lines
  it('should contain a paragraph describing the app', () => {
    const de = fixture.debugElement.query(By.css('.infoAboutUs'));
    expect(de.nativeElement.textContent).toContain('developed by the ConcordiaGo team');
    const de1 = fixture.debugElement.query(By.css('.infoAboutUs'));
    expect(de1.nativeElement.textContent).toContain('their points of interest');
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
