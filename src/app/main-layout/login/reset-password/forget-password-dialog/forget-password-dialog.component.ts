import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

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
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<ForgetPasswordDialogComponent>,
    private http: HttpClient
  ) {}

  onSubmit() {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Call the AuthService to send OTP
    this.authService.sendOtp(this.email).subscribe(
      (response) => {
        // Handle success
        this.successMessage = 'OTP sent successfully to your email!';
        setTimeout(() => {
          this.dialogRef.close(); // Close dialog after a successful request
        }, 3000);
      },
      (error) => {
        // Handle error
        this.errorMessage = 'Failed to send OTP. Please check your email and try again.';
      }
    );
  }
}
