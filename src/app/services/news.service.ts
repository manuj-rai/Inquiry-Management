import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://localhost:7158/GetActiveNews';

  constructor(private http: HttpClient) {
    console.log(this.http);
   }

  getActiveNews(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
}