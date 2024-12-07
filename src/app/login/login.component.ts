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
  showSuccessCard = false;

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
        this.showSuccessCard = true;
        localStorage.setItem('user', JSON.stringify({ email }));
        console.log('Navigating to Admin...');
        setTimeout(() => {
          this.showSuccessCard = false;
          this.router.navigate(['/admin']);
        }, 1000); // Navigate to admin after 1 seconds
      } else {
        alert('Invalid credentials!');
      }
    }
  }
}

