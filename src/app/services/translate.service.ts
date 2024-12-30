import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {}

  // Initialize the default language and fallback language
  initLanguage(): void {
    const savedLanguage = localStorage.getItem('language') || 'en'; // Default to English if not saved
    this.translate.setDefaultLang('en'); // Set default language
    this.translate.use(savedLanguage); // Use saved or default language
  }

  // Switch language dynamically
  switchLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('language', language); // Save selected language to localStorage
  }

  // Get the current language
  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
