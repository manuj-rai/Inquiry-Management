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
      icon: 'assets/images/otp.png', 
      requireInteraction: true
    };

    // Show the notification
    const notification = new Notification('OTP Sent Successfully!', options);

    // Listen for the notification click event
    notification.onclick = () => {
      // Copy OTP to clipboard
      navigator.clipboard.writeText(otp).then(() => {
        alert('OTP copied to clipboard!');
      }).catch((err) => {
        console.error('Failed to copy OTP:', err);
      });
    };
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
