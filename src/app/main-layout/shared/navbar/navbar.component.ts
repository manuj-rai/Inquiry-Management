import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../../services/translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone:true,
  imports:[TranslateModule, CommonModule, RouterModule, LazyLoadImageModule]
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false; 
  isAdmin: boolean = false;
  userDetails: any = {};
  baseImageUrl: string = 'http://www.local.com/InquiryManagement/';

  menuOpen = false;
  translationService = inject(TranslationService);
  currentLanguage: string = 'en';

  constructor(
    private authService : AuthService,
    private router: Router) {
    this.translationService.initLanguage();
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  ngOnInit() {
    // Subscribe to login status
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    const user = JSON.parse(localStorage.getItem('user')!); 
    this.isAdmin = user.isAdmin || false;
    if (user && user.userName) {
      this.authService.getUserDetails(user.userName).subscribe({
        next: (response) => {
          this.userDetails = response.data;
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  switchLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const language = target.value;
      this.translationService.switchLanguage(language);
      this.currentLanguage = language; // Update the current language in the UI
    }
  }

  logout(): void {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('user'); 
    window.location.reload(); 
  }

  getProfilePictureUrl(): string {
    const cleanedPath = this.userDetails.profilePicture.replace('~/', '');
    return `${this.baseImageUrl}${cleanedPath}`;
  }
}

