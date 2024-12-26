import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private alertServic : AlertService
  ){}

  ngOnInit(): void {

  }

  // Trigger the notification request
  notifyVisitor(): void {
    this.notificationService.requestNotificationPermission().then(permission => {
      if (permission === 'granted') {
        this.notificationService.showNotification('Thank You!', {
          body: 'We appreciate you visiting our Inquiry Management and News Portal. Explore more!',
          icon: 'assets/welcome.png',
          requireInteraction: true
        });
      }
    });
  }

  alert() {
  this.alertServic.warning("Currently unavailable. Please check back later.")
  }
}
