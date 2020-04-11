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

  addFavorite(){
    this.storage.get('favorites').then((val) => {
      if(val){
        let value = JSON.parse(val);
        if(value.indexOf(this.favorite) == -1){
          value.push(this.favorite);
          this.storage.set('favorites', JSON.stringify(value));
        }
      }else{
        let value = [this.favorite];
        this.storage.set('favorites', JSON.stringify(value));
      }
      this.ngOnInit()
    });
  }

  getFavorites(){
    this.storage.get('favorites').then((val) => {
      this.favorites = JSON.parse(val);
    });
  }

  deleteFavorite(favoriteName: string){
    if (confirm("Are you sure you would like remove this item from your favorites?") == true) {
      this.storage.get('favorites').then((val) => {
        if(val){
          let value = JSON.parse(val);
          let index = value.indexOf(favoriteName, 0);
          if (index > -1) {
            value.splice(index, 1);
            this.storage.set('favorites', JSON.stringify(value));
          }
        }
        this.ngOnInit()
      });
    }
  }

  openNewRouteWithDestination(location: string) {
    let directions = {destination: location}
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(directions)
      }
    };
  this.router.navigate(['NewRoute'], navigationExtras);
  }

}
