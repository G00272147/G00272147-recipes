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
export class HomePage {
  studentNumber = 'G00272147';
  ingredients = '';
  results: any[] = [];
  loading = false;

  constructor(private api: SpoonacularService, private router: Router) {}

  errorMsg = '';

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

goToDetails(id: number) {
  this.router.navigate(['/recipe-details', id]);
}
}