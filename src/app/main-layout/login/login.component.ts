import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordFieldType: string = 'password';

  constructor(
    private notificationService: NotificationService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form group
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],  // Email field with validation
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
      // Simulate a login check
      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          if (response.isAuthenticated) {
            this.alertService.success("Welcome back! You are now logged in!")
            localStorage.setItem('user', JSON.stringify({ username }));
            localStorage.setItem('token', response.token);
            this.router.navigate(['/admin']);
          } else {
            this.alertService.error('Invalid username or password!');
          }
          // Show login notification with the username
          this.notificationService.showNotification('Welcome Back!', {
            body: `Hello, ${username}! You have successfully logged in.`,
            icon: 'assets/user.png', // Optional: Add a user-specific icon
            requireInteraction: true, // Keeps the notification visible until interaction
          });
        },
        error: (err) => {
          console.error('Login error:', err);
          this.alertService.error('Login failed. Please try again.');
        },
      });
    }
  }

  alert() {
    this.alertService.warning("The service is currently unavailable. Please try logging in using an alternative method.")
  }

  signupAlert() {
    this.alertService.warning("Currently Unavailable. Please ask admin for creating an account.")
  }
}

