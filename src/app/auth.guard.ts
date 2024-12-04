import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('user'); 
    console.log('AuthGuard: User is logged in:', isLoggedIn);
    if (isLoggedIn) {
      return true; // Allow access
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Block access
    }
  }
}
