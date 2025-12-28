import { Routes } from '@angular/router';

export const routes: Routes = [
  {   path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recipe-details/:id',
    loadComponent: () => import('./pages/recipe-details/recipe-details.page').then( m => m.RecipeDetailsPage)
  },
  {
    path: 'favourite',
    loadComponent: () => import('./pages/favourite/favourite.page').then( m => m.FavouritePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
];
