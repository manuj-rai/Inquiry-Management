import { Component } from '@angular/core';
import { MatDialogRef, MatDialog  } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { OtpVerificationDialogComponent } from '../otp-verification-dialog/otp-verification-dialog.component';
import { SetNewPasswordDialogComponent } from '../set-new-password-dialog/set-new-password-dialog.component';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-forget-password-dialog',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './forget-password-dialog.component.html',
  styleUrl: './forget-password-dialog.component.css'
})
export class ForgetPasswordDialogComponent {
  email: string = '';
  generatedOtp: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  otpSent: boolean = false; 

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<ForgetPasswordDialogComponent>,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.otpSent) {
      // Step 1: Send OTP to the provided email
      this.authService.generateOtp(this.email).subscribe(
        (response) => {
          // Handle success
          this.generatedOtp = response.otp;
          this.successMessage = 'OTP sent successfully to your email!';
          this.otpSent = true;
          this.notificationService.showOtpSuccessNotification(this.successMessage, this.generatedOtp);

          // Open OTP verification dialog
          this.dialogRef.close(); // Close the current dialog
          const otpDialog = this.dialog.open(OtpVerificationDialogComponent, {
            width: '500px',
            data: { email: this.email, successMessage: this.successMessage }, // Pass the email to OTP dialog
          });

          otpDialog.afterClosed().subscribe((status) => {
            if (status === 'OTP_VERIFIED') {
              // Proceed to the next step (e.g., password reset)
              this.dialog.open(SetNewPasswordDialogComponent, {
                width: '500px',
                data: { email: this.email }
              });
            }
          });
        },
        (error) => {
          // Handle error
          this.errorMessage = 'Failed to send OTP. Please check your email and try again.';
          this.notificationService.showErrorNotification(this.errorMessage);
        }
      );
    }
  }

}
