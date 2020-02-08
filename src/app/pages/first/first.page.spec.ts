import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirstPage } from './first.page';

describe('FirstPage', () => {
  let component: FirstPage;
  let fixture: ComponentFixture<FirstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
