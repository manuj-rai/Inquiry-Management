import { Component, OnInit, inject } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { NotificationService } from '../../services/notification.service';
import { TranslationService } from '../../services/translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  translationService = inject(TranslationService);
  currentLanguage: string = 'en';

  constructor(
    private notificationService: NotificationService,
    private alertService : AlertService
  ){
    this.translationService.initLanguage();
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  ngOnInit(): void {

  }

  // Trigger the notification request
  notifyVisitor(): void {
    // Check the current permission state before requesting
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        this.notificationService.showNotification('Thank You!', {
          body: 'We appreciate you visiting our Inquiry Management and News Portal. Explore more!',
          icon: 'assets/images/welcome.png',
          requireInteraction: true
        });
      } else if (permission === 'denied') {
        this.alertService.error('Notification permission has been denied by the user.');
      } else if (permission === 'default') {
        this.alertService.error('Notification permission request was not granted or denied yet.');
      }
    }).catch(error => {
      console.error('Error while requesting notification permission:', error);
    });
  }
  
  alert() {
  this.alertService.warning("Currently unavailable. Please check back later.")
  }
}
