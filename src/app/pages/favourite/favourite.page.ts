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
  favs: any[] = [];

  constructor(private store: StoreService) { }

  async ionViewWillEnter() {
    this.favs = await this.store.getFavourites()
  }
}