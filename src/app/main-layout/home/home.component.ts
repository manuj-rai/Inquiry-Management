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
    private alertServic : AlertService
  ){
    this.translationService.initLanguage();
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  ngOnInit(): void {

  }

  // Trigger the notification request
  notifyVisitor(): void {
    this.notificationService.requestNotificationPermission().then(permission => {
      if (permission === 'granted') {
        this.notificationService.showNotification('Thank You!', {
          body: 'We appreciate you visiting our Inquiry Management and News Portal. Explore more!',
          icon: 'assets/images/welcome.png',
          requireInteraction: true
        });
      }
    });
  }

  alert() {
  this.alertServic.warning("Currently unavailable. Please check back later.")
  }
}
