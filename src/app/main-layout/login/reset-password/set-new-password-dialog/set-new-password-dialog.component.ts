import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-set-new-password-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './set-new-password-dialog.component.html',
  styleUrls: ['./set-new-password-dialog.component.css'],
})
export class SetNewPasswordDialogComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  phone: string = ''; // Pass this from previous steps

  constructor(
    private dialogRef: MatDialogRef<SetNewPasswordDialogComponent>,
    private http: HttpClient
  ) {}

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const payload = { phone: this.phone, password: this.newPassword };
    this.http.post('/api/auth/reset-password', payload).subscribe(
      () => {
        alert('Password reset successfully!');
        this.dialogRef.close();
      },
      () => {
        alert('Error resetting password. Please try again.');
      }
    );
  }
}
