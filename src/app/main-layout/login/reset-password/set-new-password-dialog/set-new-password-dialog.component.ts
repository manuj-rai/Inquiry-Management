import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../services/alert.service';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-set-new-password-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './set-new-password-dialog.component.html',
  styleUrls: ['./set-new-password-dialog.component.css'],
})
export class SetNewPasswordDialogComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = ''; 
  errorMessage: string ='';

  constructor(
    private authService : AuthService,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<SetNewPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {this.email = data.email;}

  resetPassword() {
    this.errorMessage = '';
    if (!this.isPasswordStrong(this.newPassword)) {
      this.errorMessage = 'Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match. Please try again.';
      return;
    }
    const payload = {email: this.email, newPassword: this.newPassword };
    this.authService.resetPassword(payload).subscribe({
      next: (response) => {
        // Handle success
        this.alertService.success('Password reset successfully.', response.message);
      },
      error: (err) => {
        // Handle error
        this.errorMessage = err.error?.message || 'Password reset failed. Please try again.';
      }
    });
  }

  isPasswordStrong(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password); 
  }
}
