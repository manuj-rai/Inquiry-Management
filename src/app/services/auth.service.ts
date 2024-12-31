import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // Method to call the login API
  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { userName, password }).pipe(
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
    return this.http.get(`${this.baseUrl}/GetUserDetails`, {
      params: { userName: username }
    });
  }

  // Method to get top 5 recent users
  getRecentUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recent-users`);
  }

  // Method to update user details
  updateUserDetails(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/UpdateUserDetails`, formData);
  }

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-otp`, { email });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-otp`, { email, otp });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { email, newPassword });
  }
}
