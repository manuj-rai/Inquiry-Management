import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'https://localhost:7158';

  constructor(private http: HttpClient) { }

  // Method to call the login API
  login(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userName, password });
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUserDetails`, {
      params: { userName: username }
    });
  }
}