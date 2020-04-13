import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewRouteComponent } from './new-route.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {autoSpy} from '../../../../auto-spy';
import {Storage} from '@ionic/storage';
import {AboutUsComponent} from '../about-us/about-us.component';

describe('NewRouteComponent', () => {
  let component: NewRouteComponent;
  let fixture: ComponentFixture<NewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRouteComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRouteComponent);
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
