import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone:true,
  imports:[TranslateModule]
})

export class NavbarComponent {
  menuOpen = false;
  translationService = inject(TranslationService);
  currentLanguage: string = 'en';

  constructor(private router: Router) {
    this.translationService.initLanguage();
    this.currentLanguage = this.translationService.getCurrentLanguage();
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
}

