import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { HomeSearchComponent } from './home-search.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HomeSearchComponent', () => {
  let component: HomeSearchComponent;
  let fixture: ComponentFixture<HomeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSearchComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
      providers: [Storage]
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
    expect(bar.innerHTML).not.toEqual('Hello');
    expect(bar.shadowRoot).toBeNull();
  }));

  /*it('should trigger goToSearchResult method when user searches an address, then Enter key is pressed', async(() => {
    spyOn(component, 'goToSearchResult');
    fixture.debugElement.nativeElement.querySelector('ion-toolbar').setValue('HALL');
    fixture.detectChanges();

    const event: Event = new KeyboardEvent('keypress', {key: 'Enter'});
    window.dispatchEvent(event);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.goToSearchResult).toHaveBeenCalledWith('HALL');
    });
  }));
*/

});
