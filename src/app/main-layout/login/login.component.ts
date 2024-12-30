import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { NotificationService } from '../../services/notification.service';

import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordDialogComponent } from './reset-password/forget-password-dialog/forget-password-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { OtpVerificationDialogComponent } from './reset-password/otp-verification-dialog/otp-verification-dialog.component';
import { SetNewPasswordDialogComponent } from './reset-password/set-new-password-dialog/set-new-password-dialog.component';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatDialogModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordFieldType: string = 'password';

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form group
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],  // field with validation
      password: ['', [Validators.required, Validators.minLength(4)]],  // Password with min length
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // Submit the login form
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          if (response.isAuthenticated) {
            this.alertService.success("Welcome back! You are now logged in!");
            localStorage.setItem('user', JSON.stringify({ username }));
            localStorage.setItem('token', response.token);
            this.router.navigate(['/admin']);
          } else {
            this.alertService.error('Login failed. Please try again.');
          }
        },
        error: (err) => {
          // Display the error message from the backend
          this.alertService.error(err.message || 'An unexpected error occurred.');
        }
      });
    }
  }

  openForgetPasswordDialog() {
    const forgetDialog = this.dialog.open(ForgetPasswordDialogComponent, {
      width: '400px',
    });
  
    forgetDialog.afterClosed().subscribe((phone) => {
      if (phone) {
        const otpDialog = this.dialog.open(OtpVerificationDialogComponent, {
          width: '400px',
          data: { phone },
        });
  
        otpDialog.afterClosed().subscribe((status) => {
          if (status === 'OTP_VERIFIED') {
            this.dialog.open(SetNewPasswordDialogComponent, {
              width: '400px',
              data: { phone },
            });
          }
        });
      }
    });
  }
  
  alert() {
    this.alertService.warning("The service is currently unavailable. Please try logging in using an alternative method.")
  }

  signupAlert() {
    this.alertService.warning("Currently Unavailable. Please ask admin for creating an account.")
  }
}

