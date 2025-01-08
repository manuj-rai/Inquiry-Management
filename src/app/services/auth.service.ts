import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('authToken'); // Or any other condition
  }

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // Method to call the login API
  login(userName: string, password: string): Observable<any> {  
    return this.http.post<any>(`${this.baseUrl}/login`, { userName, password }).pipe(
      tap(() => console.log('Login request sent')), 
      map(response => {
        // Check for successful login (statusCode 100)
        if (response?.header?.statusCode === 100 && response.data?.isAuthenticated) {
          this.isLoggedInSubject.next(true);
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data));
          return { 
            isAuthenticated: true, 
            token: response.data.token, 
            isAdmin: response.data.isAdmin };
        } 
        // Handle invalid login (statusCode 401)
        if (response?.header?.statusCode === 401) {
          return {
            isAuthenticated: false,
            message: response.header?.desc || 'Login failed'
          };
        }
        // Default message for other failure scenarios
        return {
          isAuthenticated: false,
          message: response.header?.desc || 'Login failed'
        };
      }),
      catchError((error) => {
        let errorMessage = 'An error occurred during login. Please try again.'; 
        // Handle specific error message from backend if present
        if (error.error && error.error.header?.desc) {
          errorMessage = error.error.header.desc;  
        } else if (error.status === 0) {
          errorMessage = 'Network error. Please check your connection.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Return true if token exists, otherwise false
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.isAdmin || false;
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

  generateOtp(email: string): Observable<any> {
    const payload = { email };
    return this.http.post<any>(`${this.baseUrl}/generateOTP`, payload );
  }

  // Validate OTP
  validateOtp(payload: { email: string, otp: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/validateOTP`, payload);
  }

  resetPassword(payload: { email: string, newPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/resetPassword`, payload);
  }
}
