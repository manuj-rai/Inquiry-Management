import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { NotificationService } from '../../../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-verification-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './otp-verification-dialog.component.html',
  styleUrls: ['./otp-verification-dialog.component.css'],
})
export class OtpVerificationDialogComponent {
  otp: string = '';
  email: string = ''; // Pass this from the previous step
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private notificationService : NotificationService,
    private authService : AuthService,
    private dialogRef: MatDialogRef<OtpVerificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.email = data.email;
    this.successMessage = data.successMessage;
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
}

