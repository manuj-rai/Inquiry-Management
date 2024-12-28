import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'https://localhost:7158';

  constructor(private http: HttpClient) { }

  // Method to call the login API
  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { userName, password }).pipe(
      map(response => {
        if (response && response.token) {
          return { isAuthenticated: true, token: response.token };
        } else {
          return { isAuthenticated: false, message: response.message || 'Login failed' };
        }
      }),
      catchError((error) => {
        let errorMessage = 'An error occurred during login. Please try again.';
        
        // Extract the message from the backend if available
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
  
        console.error('Login error:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  

  getUserDetails(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUserDetails`, {
      params: { userName: username }
    });
  }

  // Method to get top 5 recent users
  getRecentUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recent-users`);
  }

  // Method to update user details
  updateUserDetails(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/UpdateUserDetails`, formData);
  }
}
