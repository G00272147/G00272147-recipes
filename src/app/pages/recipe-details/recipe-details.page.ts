import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpoonacularService } from '../../services/spoonacular';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RecipeDetailsPage implements OnInit {
  id = 0;
  recipe: any = null;
 
  measurement: 'metric' | 'us' = 'metric';
  isFav = false;

  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private api: SpoonacularService,
    private store: StoreService,
  ) { }

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('DETAILS ID:', this.id);

    this.loading = true;
    this.errorMsg = '';

    //Load measurment + favourites
    try{
    this.measurement = await this.store.getMeasurement();
    const favs = await this.store.getFavourites();
    this.isFav = favs.some((r: any) => r.id === this.id);
    } catch (e) {
      console.error('Store error:', e);
    }

    //Load recipe details
    this.api.getRecipeDetails(this.id).subscribe({
      next: (r) => {
        console.log('DETAILS RESPONSE:', r);
        this.recipe = r;
        this.loading = false;
      },
        error: (e) => {
        console.error('DETAILS API ERROR:', e);
        this.errorMsg = 'Could not load recipe details';
        this.loading = false;
       },
      });
    }
        
 measureText(ing: any): string {
  const m = this.measurement === 'us' ? ing.measures.us : ing.measures.metric;
  const amount = Math.round(Number(m.amount) * 1000) / 1000;
  const unit = (m.unitLong ?? '').trim();
  return `${amount}${unit ? ' ' + unit : ""}`;
}

steps(): any[] {
  return this.recipe?.analyzedInstructions?.[0]?.steps ?? [];
}

async toggleFavourite() {
  if (!this.recipe) return;

  const favs = await this.store.getFavourites();
  const id = this.recipe.id;

  if (this.isFav) {
    const updated = favs.filter((r: any) => r.id !== id);
    await this.store.setFavourites(updated);
    this.isFav = false;
  } else {
    favs.unshift({
      id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image,
    });
    await this.store.setFavourites(favs);
    this.isFav = true;
   }
  }
}
