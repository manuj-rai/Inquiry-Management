import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  // Check and request permission for notifications
  requestNotificationPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      return Notification.requestPermission();
    }
    return Promise.resolve('denied');
  }

  // Show a notification
  showNotification(title: string, options: NotificationOptions): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }

    // Show a success notification with OTP
  showOtpSuccessNotification(message: string, otp: string): void {
    const options: NotificationOptions = {
      body: `${message} OTP: ${otp}`, 
      icon: 'assets/images/otp.png', // You can provide an icon here
    };

    this.showNotification('OTP Sent Successfully!', options);
  }

  // Show an error notification
  showErrorNotification(message: string): void {
    const options: NotificationOptions = {
      body: message,
      icon: 'path_to_error_icon.png', // You can provide an error icon here
    };

    this.showNotification('Error', options);
  }
}
