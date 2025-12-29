import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SpoonacularService } from '../../services/spoonacular';
import { StoreService } from '../../services/store.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})

// Let users search recipes by ingredients and view results
export class HomePage { 
  studentNumber = 'G00272147'; // Student number shown in header
  ingredients = ''; // enter text in ingredients input field
  results: any[] = []; // results returned from spoonacular API
  loading = false;
  errorMsg = '';

  // Recent searches (stored locally)
  recentSearches: string[] = [];

constructor(
    private api: SpoonacularService, 
    private router: Router, 
    private store: StoreService) {}

// Runs each time the home page opens (reload recent searches)
async ionViewWillEnter() {
  this.recentSearches = await this.store.getRecentSearches();
}

// Call SpoonacularService to search recipes by ingredients
search() {
  const query = this.ingredients.trim();
  if (!query) {
    this.errorMsg = 'Please enter at least one ingredient.';
    return;
   }
    
    this.errorMsg = '';
    this.loading = true;
    this.results = []; // Clear previous results

    this.api.searchRecipes(query).subscribe({
      next: async (res) => {
      this.results = res;
      this.loading = false;

      // Save this search to recent searches
      await this.saveRecentSearch(query);
         },
      error: (err) => {
        console.error('SEARCH ERROR:', err);
        this.errorMsg = 'Could not load recipes';
        this.loading = false;
      },
    });
}

// Save recenet search to max 5, newest first, no duplicates
private async saveRecentSearch(query: string) {
  const q = query.trim();
  if (!q) return;

// Normalise "a,b,c" to "a, b, c"
const normalized = q
.split(',')
.map((x) => x.trim())
.filter(Boolean)
.join(', ');

// Remove duplicates
const withoutDuplicates = this.recentSearches.filter(
  (s) => s.toLowerCase() !== normalized.toLowerCase()
);

// Add to start of list to keep only last 5 searches
this.recentSearches = [normalized, ...withoutDuplicates].slice(0, 5);

// Persist in Preferences
await this.store.setRecentSearches(this.recentSearches);
}

// When user clicks a recent search, perform that search again
useRecentSearch(s: string) {
  this.ingredients = s;
  this.search();
}

// clear recent searches list
async clearRecentSearches() {
  this.recentSearches = [];
  await this.store.setRecentSearches([])
}

// Navigate to recipe details page
goToDetails(id: number) {
  this.router.navigate(['/recipe-details', id]);
}
}