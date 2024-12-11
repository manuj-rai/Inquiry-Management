import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  showSuccessCard = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
     private router: Router) {
    // Initialize the form group
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],  // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]],  // Password with min length
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
            localStorage.setItem('user', JSON.stringify({ username }));
            this.showSuccessCard=true;
            localStorage.setItem('token', response.token);
            this.router.navigate(['/admin']);
          } else {
            alert('Invalid credentials!');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Login failed. Please try again.');
        },
      });
    }
  }
}

