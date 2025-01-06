import { Component, Inject, OnInit, OnDestroy  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { NotificationService } from '../../../../services/notification.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-otp-verification-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './otp-verification-dialog.component.html',
  styleUrls: ['./otp-verification-dialog.component.css'],
})
export class OtpVerificationDialogComponent implements OnInit, OnDestroy {
  otp: string = '';
  email: string = ''; // Pass this from the previous step
  errorMessage: string = '';
  successMessage: string = '';

  remainingTime: number = 300; // 5 minutes (in seconds)
  timerSubscription: Subscription | null = null; // Initialize with null

  constructor(
    private notificationService : NotificationService,
    private authService : AuthService,
    private dialogRef: MatDialogRef<OtpVerificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.email = data.email;
    this.successMessage = data.successMessage;
  }

  ngOnInit() {
    this.startOtpTimer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  verifyOtp() {
    // Reset messages
    this.errorMessage = '';

    const payload = { email: this.email, otp: this.otp };

    this.authService.validateOtp(payload).subscribe(
      (response) => {
        // Success: OTP validated
        this.successMessage = 'OTP verified successfully! You can now reset your password.';

        // Show success notification
        this.notificationService.showNotification('OTP Verified', {
          body: this.successMessage,
          icon: '../../../../../assets/images/check.png', // optional, replace with your actual icon
        });

        this.dialogRef.close('OTP_VERIFIED'); // Close the dialog with OTP verification status
      },
      (error) => {
        // Error: OTP is invalid
        this.errorMessage = 'Invalid OTP. Please try again.';

        // Optionally clear OTP field for retry
        this.otp = '';
      }
    );
  }

    // Start the OTP expiry timer
    startOtpTimer() {
      this.timerSubscription = new Subscription();
      const interval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  
    // Resend OTP method
    resendOtp() {
      this.notificationService.showOtpSuccessNotification(this.successMessage, '123456'); // Example OTP
      this.remainingTime = 300; // Reset timer
      this.startOtpTimer();
      alert('OTP has been resent!');
    }
  
}

