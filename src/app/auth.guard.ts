import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isAdminRoute = route.data['isAdmin'] || false;

    if (!isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (isAdminRoute && !this.authService.isAdmin()) {
      this.router.navigate(['/error'], { queryParams: { message: 'Unauthorized access' } });
      return false;
    }
    return true;

  }
}
