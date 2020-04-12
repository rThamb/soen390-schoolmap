import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesComponent } from './favorites.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {IonicStorageModule} from "@ionic/storage";
import {RouterTestingModule} from "@angular/router/testing";

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

    it('should call the function addFavorite() on click', async(() => {
        spyOn(component, 'addFavorite');
        const button = fixture.debugElement.nativeElement.querySelector('ion-button');
        button.click();

        fixture.whenStable().then(() => {
            expect(component.addFavorite).toHaveBeenCalled();
        });
    }));
});
