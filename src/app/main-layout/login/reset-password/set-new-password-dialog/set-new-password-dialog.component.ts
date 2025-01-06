import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-set-new-password-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
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
    private alertService: AlertService,
    private dialogRef: MatDialogRef<SetNewPasswordDialogComponent>,
    private http: HttpClient
  ) {}

  resetPassword() {
    this.errorMessage = '';

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match. Please try again.';
      return;
    }

    const payload = { email: this.email, password: this.newPassword };
    this.http.post('/api/auth/reset-password', payload).subscribe(
      () => {
        this.alertService.success('Password reset successfully!');
        this.dialogRef.close();
      },
      () => {
      this.errorMessage ='Error resetting password. Please try again.';
      }
    );
  }
}
