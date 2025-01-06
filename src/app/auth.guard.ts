import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('authToken'); // Check if a token exists

    if (token) {
      const isLoginPage = route.routeConfig?.path === 'login'; // Check if navigating to login page

      if (isLoginPage) {
        this.router.navigate(['/profile']); // Redirect logged-in users from login page
        return false;
      }

      // Allow access if authenticated and not navigating to login page
      return true;
    } else {
      if (route.routeConfig?.path !== 'login') {
        // Redirect unauthenticated users to login page if accessing a restricted route
        this.router.navigate(['/login']);
        return false;
      }

      // Allow access to the login page if not authenticated
      return true;
    }
  }
}
