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
    const requiredRole  = route.data['requiredRole'] || 20;

    if (!isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { message: 'Unauthorized access' } });
      return false;
    }  

    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/error'], { queryParams: { message: 'Insufficient permissions' } });
      return false;
    }
    
    return true;
  }
}
