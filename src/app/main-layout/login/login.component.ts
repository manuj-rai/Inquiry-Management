import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
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
        },
        error: (err) => {
          console.error('Login error:', err);
          this.alertService.error('Login failed. Please try again.');
        },
      });
    }
  }
}

