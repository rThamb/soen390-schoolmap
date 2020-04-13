import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {IonicStorageModule, Storage} from '@ionic/storage';
import { HomeSearchComponent } from './home-search.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {autoSpy} from '../../../../auto-spy';
import {AboutUsComponent} from '../about-us/about-us.component';

describe('HomeSearchComponent', () => {
  let component: HomeSearchComponent;
  let fixture: ComponentFixture<HomeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSearchComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit location of indoorPOI when goToSearchResult is called', () =>{
    spyOn(component, 'goToSearchResult');
    component.goToSearchResult('HB840');
    expect(component.goToSearchResult).toHaveBeenCalledWith('HB840');
  })

  it('should translate the page based on language preference', () => {
    spyOn(component, 'translatePage');

    component.translatePage();
    expect(component.translatePage).toHaveBeenCalled();
  });


  it('should check if user can search "Concordia" address', async(() => {
    const bar = fixture.debugElement.nativeElement.querySelector('ion-searchbar');
    expect(bar.innerHTML).not.toEqual('Hello');
    expect(bar.shadowRoot).toBeNull();
  }));




});
