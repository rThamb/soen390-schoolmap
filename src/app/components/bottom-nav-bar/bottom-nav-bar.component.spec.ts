import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BottomNavBarComponent } from './bottom-nav-bar.component';

describe('BottomNavBarComponent', () => {
  let component: BottomNavBarComponent;
  let fixture: ComponentFixture<BottomNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomNavBarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
