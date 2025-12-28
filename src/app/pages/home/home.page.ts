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

  search() {
    this.loading = true;
    this.api.searchRecipes(this.ingredients).subscribe({
      next: (res) => {
      this.results = res;
      this.loading = false;
      alert('Could not load recipes');
      },
    });
}

goToDetails(id: number) {
  this.router.navigate(['/recipe-details', id]);
}
}