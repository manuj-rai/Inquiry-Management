import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password-dialog',
  standalone: true,
  imports: [
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
  phone: string = '';

  constructor(
    private dialogRef: MatDialogRef<ForgetPasswordDialogComponent>,
    private http: HttpClient
  ) {}

  onSubmit() {
    if (!this.phone || !/^\d{10}$/.test(this.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    const payload = { phone: this.phone };
    this.http.post('/api/auth/send-reset-code', payload).subscribe(
      () => {
        alert('Password reset code sent to your phone!');
        this.dialogRef.close();
      },
      () => {
        alert('Error sending reset code. Please try again.');
      }
    );
  }
}
