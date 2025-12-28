import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from 'rxjs';

@Injectable ({providedIn: 'root'})
export class SpoonacularService {
    private readonly apiKey = '70759a4f7911402abcc53d3c51d3b759';
    private readonly base = 'https://api.spoonacular.com';

    constructor(private http: HttpClient) {}

   searchRecipes(query: string): Observable<any[]> {
    const params = new HttpParams()
    .set('apiKey', this.apiKey)
    .set('query', query.trim())
    .set('number', '20');

    return this.http
    .get<{ results: any[] }>(`${this.base}/recipes/complexSearch`, { params })
    .pipe(map(res => res.results ?? []));
}

getRecipeDetails(id: number): Observable<any>{
    const params = new HttpParams().set('apiKey', this.apiKey);
    return this.http.get<any>(`${this.base}/recipes/${id}/information`, { params });
}
}
