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

  constructor(private storage: Storage, private router: Router) {
    this.translatePage();
   }

  ngOnInit() {
    this.getFavorites();
    this.translatePage();
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
  async deleteFavorite(favoriteName: string) {
    let userConfirm
    await this.storage.get('languagePreference').then((lP) => {
      if (lP === 'French') {
        userConfirm = confirm('Voulez-vous supprimer cet article?');
      } else {
        userConfirm = confirm('Are you sure you would like remove this item from your favorites?');
      }

      if (userConfirm === true) {
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
    });
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

  async translatePage() {

    this.storage.ready().then(() => {
      this.storage.get('languagePreference').then((lP) => {

        if (lP == null) {
          this.storage.set('languagePreference', 'English');
        }
        if ( lP === 'French') {
          document.getElementById('addFavText').innerHTML = 'Ajouter favori';
          document.getElementsByName('favoriteLocation')[0].setAttribute('placeholder', 'Localisation');
          if(this.favorites && this.favorites.length && document.getElementById('myFavText') != null)
            document.getElementById('myFavText').innerHTML = 'Mes Favoris';
        } else {
          document.getElementById('addFavText').innerHTML = 'Add Favorite';
          document.getElementsByName('favoriteLocation')[0].setAttribute('placeholder', 'Location');
          if(this.favorites && this.favorites.length && document.getElementById('myFavText') != null)
            document.getElementById('myFavText').innerHTML = 'My Favorites';         
        }
      });
    });
  }

}
