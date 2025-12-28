//Defines URLs/paths for each page in the app
//Uses lazy loading (loadComponent) for standalone pages

import { Routes } from '@angular/router';

export const routes: Routes = [
  //Home page (default page users see first)
  {   
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },

  //Redirect empty path to home page
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  //Recipe details page with recipe ID in URL
  {
    path: 'recipe-details/:id',
    loadComponent: () => import('./pages/recipe-details/recipe-details.page').then( m => m.RecipeDetailsPage)
  },

  //Favourite page
  {
    path: 'favourite',
    loadComponent: () => import('./pages/favourite/favourite.page').then( m => m.FavouritePage)
  },

  //Settings page
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
];
