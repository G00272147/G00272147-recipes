//Spoonacular API service to search for recipes and get recipe details
//Handles HTTP requests to Spoonacular API
//Used by RecipeSearchPage and RecipeDetailPage

import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from 'rxjs';

@Injectable ({providedIn: 'root'})
export class SpoonacularService {
    //API key for Spoonacular API
    private readonly apiKey = '70759a4f7911402abcc53d3c51d3b759';

    //Base URL for Spoonacular API requestes
    private readonly base = 'https://api.spoonacular.com';

    //Inject HttpClient for making HTTP requests
    constructor(private http: HttpClient) {}

    //Searches for recipes matching the query string. Query can contain multiple words separated by commas
   searchRecipes(query: string): Observable<any[]> {
    //Builed query string parameters for the API request
    const params = new HttpParams()
    .set('apiKey', this.apiKey)
    .set('query', query.trim())
    .set('number', '20'); // number of results to return

    //Call Spoonacular complexSearch endpoint and return the results array
    return this.http
    .get<{ results: any[] }>(`${this.base}/recipes/complexSearch`, { params })
    .pipe(map(res => res.results ?? []));
}

//Get full recipe details by recipe ID
getRecipeDetails(id: number): Observable<any>{
    //Only needs API key as parameter
    const params = new HttpParams().set('apiKey', this.apiKey);

    //Call Spoonacular recipe information endpoint
    return this.http.get<any>(`${this.base}/recipes/${id}/information`, { params });
}
}
