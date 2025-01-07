import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isAdminRoute = route.data['isAdmin'] || false;

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    if (isAdminRoute && !this.authService.isAdmin()) {
      this.router.navigate(['/profile']); // Redirect normal users
      return false;
    }
    return true;

  }
}
