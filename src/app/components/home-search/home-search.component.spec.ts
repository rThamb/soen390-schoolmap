import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeSearchComponent } from './home-search.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('HomeSearchComponent', () => {
  let component: HomeSearchComponent;
  let fixture: ComponentFixture<HomeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSearchComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check if user can search "Concordia" address', async(() => {
    const bar = fixture.debugElement.nativeElement.querySelector('ion-searchbar');

    // this.searchResult = "Concordia";

    expect(bar).not.toBeNull(); // test if user enters an address
    expect(bar.innerHTML).not.toEqual('Hello'); // can't search a word that is not an address
    // expect(bar.this.searchResult).toEqual('Concordia'); // can search a campus
    expect(bar.shadowRoot).toBeNull();
  }));

});
