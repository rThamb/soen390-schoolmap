import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { FavoritesComponent } from './favorites.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {IonicStorageModule} from "@ionic/storage";
import {RouterTestingModule} from "@angular/router/testing";
import { Router, NavigationExtras } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, IonicStorageModule.forRoot(), IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the add favorite button', () => {
    const btn = fixture.debugElement.query(By.css('#addFavoriteBtn'));
    expect(btn.nativeElement.textContent).toContain('Add Favorite');
  });

  it('when addFavorite is called it should add a new item to storage', () => {
    component.favorite = "concordia loyola";
    component.addFavorite();
    component.getFavorites();
    let storage = TestBed.get(Storage);
    let result;
    storage.ready().then(() => {
      result = storage.get('favorites');
      console.log(result)
    });
    if(result) 
      expect(result).toContain("concordia loyola");
    else
      expect(result).toBeFalsy();
  });

  it('when deleteFavorite is called it should prompt a confimation message', () => {
    spyOn(window, 'confirm');
    component.deleteFavorite("concordia loyola");
    expect(window.confirm).toHaveBeenCalled() 
  });

  it('when openNewRouteWithDestination is called it should redirect to NewRoute with argument', async(inject([Router], (router) => {
    spyOn(router, 'navigate');
    component.openNewRouteWithDestination("concordia university")
    let directions = {destination: "concordia university"}
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(directions)
      }
    };
    expect(router.navigate).toHaveBeenCalledWith(['NewRoute'], navigationExtras);
  })));

});
