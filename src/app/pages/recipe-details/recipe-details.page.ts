//recipe details page, shows ingredients and instructions for a selected recipe
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpoonacularService } from '../../services/spoonacular';
import { StoreService } from '../../services/store.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule] //Use RouterModule for routerLink buttons to work on this page
})

//Allows users to add or remove recipes from their favourites list
export class RecipeDetailsPage implements OnInit {
  //Recipe ID from route 
  id = 0;

  //Recipe details object returned from Spoonacular
  recipe: any = null;
 
  //User measurement preference
  measurement: 'metric' | 'us' = 'metric';
  isFav = false;

  //Loading and error states
  loading = true;
  errorMsg = '';

  constructor(
    //Read ID parameter from URL
    private route: ActivatedRoute,

    //Spoonacular API service
    private api: SpoonacularService,

    //Local storage service
    private store: StoreService,
  ) { }

  async ngOnInit() {
    //Get recipe ID from URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('DETAILS ID:', this.id);

    // Reset states
    this.loading = true;
    this.errorMsg = '';

    //Load measurment + favourites from local storage
    try{
    this.measurement = await this.store.getMeasurement();
    const favs = await this.store.getFavourites();

    //Check if recipe is in favourites
    this.isFav = favs.some((r: any) => r.id === this.id);
    } catch (e) {
      console.error('Store error:', e);
    }

    //Load recipe details from Spoonacular API
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
  //Format ingredient amount for display
  private formatAmount(n: number): string {
  if (!isFinite(n)) return '';

  const rounded = n >= 10 ? Math.round(n) : Math.round(n * 10) / 10;

  // Remove trailing .0 (e.g. 2.0 -> "2")
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}  

//Format ingredient measurement based on user preference
 measureText(ing: any): string {
  const m = this.measurement === 'us' ? ing.measures.us : ing.measures.metric;
  
  const amountStr = this.formatAmount(Number(m.amount));
  const unit = (m.unitLong ?? '').trim();
    return `${amountStr}${unit ? ' ' + unit : ''}`;
}

//Returns insttruction steps or empty array if none
steps(): any[] {
  return this.recipe?.analyzedInstructions?.[0]?.steps ?? [];
}

//Add or remove recipe from favourites list
async toggleFavourite() {
  //Do nothing if recipe not loaded
  if (!this.recipe) return;

  const favs = await this.store.getFavourites();
  const id = this.recipe.id;

  if (this.isFav) {
    //Remove from favourites
    const updated = favs.filter((r: any) => r.id !== id);
    await this.store.setFavourites(updated);
    this.isFav = false;
  } else {
    //Add to favourites
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
