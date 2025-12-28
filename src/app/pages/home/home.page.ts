import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SpoonacularService } from '../../services/spoonacular';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})

//Let users search recipes by ingredients and view results
export class HomePage { 
  studentNumber = 'G00272147'; // Student number shown in header
  ingredients = ''; //enter text in ingredients input field
  results: any[] = []; //results returned from spoonacular API
  loading = false;

  constructor(private api: SpoonacularService, private router: Router) {}

  errorMsg = ''; //error message to display if search fails

  //Call SpoonacularService to search recipes by ingredients
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
      next: (res) => {
      this.results = res;
      this.loading = false;
         },
      error: (err) => {
        console.error('SEARCH ERROR:', err);
        this.errorMsg = 'Could not load recipes';
        this.loading = false;
      },
    });
}

//Navigate to recipe details page
goToDetails(id: number) {
  this.router.navigate(['/recipe-details', id]);
}
}