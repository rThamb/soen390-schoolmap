import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  favorite;
  favorites;

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.getFavorites();
  }

  // When the form is submitted the new favorite location is added to local storage.
  addFavorite() {
    if (this.favorite) {
      this.storage.get('favorites').then((val) => {
        if (val) {
          const value = JSON.parse(val);
          // If the new favorite location already exists in local storage it will not be added again.
          if (value.indexOf(this.favorite) === -1) {
            value.push(this.favorite);
            this.storage.set('favorites', JSON.stringify(value));
          }
        } else {
          const value = [this.favorite];
          this.storage.set('favorites', JSON.stringify(value));
        }
        // Reload page
        this.ngOnInit();
      });
    }
  }

  // Retrieves favorites from local storage.
  getFavorites() {
    this.storage.get('favorites').then((val) => {
      this.favorites = JSON.parse(val);
    });
  }

  // Prompts the user with a confirmation message before removing an item from their favorites.
  deleteFavorite(favoriteName: string) {
    if (confirm('Are you sure you would like remove this item from your favorites?') === true) {
      this.storage.get('favorites').then((val) => {
        if (val) {
          const value = JSON.parse(val);
          const index = value.indexOf(favoriteName, 0);
          if (index > -1) {
            value.splice(index, 1);
            this.storage.set('favorites', JSON.stringify(value));
          }
        }
        // Reload page
        this.ngOnInit();
      });
    }
  }

  // Launches the new route page with a specific location set as the destination.
  openNewRouteWithDestination(location: string) {
    const directions = {destination: location};
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(directions)
      }
    };
    this.router.navigate(['NewRoute'], navigationExtras);
  }

}
