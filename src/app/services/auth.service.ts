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
            role: response.data.role };
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

  getRole(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || 0;
  }

  hasRole(requiredRole: number): boolean {
    const userRole = this.getRole();
    return userRole >= requiredRole; // Check if user's role meets or exceeds the required role
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

  // Method to get paginated users
  getPaginatedUsers(pageNumber: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}/GetPaginatedUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url); // Sending GET request to fetch users
  }

  // Method to update isAdmin status
  updateIsAdmin(Id: number, isAdmin: boolean): Observable<any> {
    const url = `${this.baseUrl}/${Id}/isAdmin`;
    const body = { isAdmin }; // Request body containing isAdmin value
    return this.http.put<any>(url, body); // Sending PUT request
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
