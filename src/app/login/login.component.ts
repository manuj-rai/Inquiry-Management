import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form group
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email field with validation
      password: ['', [Validators.required, Validators.minLength(5)]],  // Password with min length
    });
  }

  // Submit the login form
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simulate a login check
      if (email === 'admin@example.com' && password === 'admin') {
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify({ email }));
        console.log('Navigating to Admin...');
        // Navigate to the admin dashboard
        this.router.navigate(['/admin']);
      } else {
        alert('Invalid credentials!');
      }
    }
  }
}

