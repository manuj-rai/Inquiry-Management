import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    console.log(this.http);
   }

   // Fetch all active news
  getActiveNews(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetActiveNews?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  // Fetch top news
  getTopNews(take: number, skip: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetTopNews?take=${take}&skip=${skip}`);
  }

  // Fetch all tags
  getAllTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Categories`);
  }

  // Fetch news by tag name
  getNewsByTag(tagName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/News-by-Categories?tagName=${tagName}`);
  }

  // Method to add news
  addNews(newsData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-news`, newsData);
  }

  getTagSuggestions(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/suggestions?query=${query}`);
  }
}