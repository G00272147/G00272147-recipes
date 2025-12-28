//Load and display saved favourite recipes rom the local storage using StoreService
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  standalone: true,
    imports: [CommonModule, IonicModule, RouterModule],
})

export class FavouritePage {
  //Array to hold favourite recipes from local storage
  favs: any[] = [];

  //Inject StoreService to read favourites from preferences
  constructor(private store: StoreService) { }

  //Reloads favourites list so it updates after add/remove
  async ionViewWillEnter() {
    this.favs = await this.store.getFavourites()
  }
}