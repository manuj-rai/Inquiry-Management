import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-verification-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './otp-verification-dialog.component.html',
  styleUrls: ['./otp-verification-dialog.component.css'],
})
export class OtpVerificationDialogComponent {
  otp: string = '';
  phone: string = ''; // Pass this from the previous step

  constructor(
    private dialogRef: MatDialogRef<OtpVerificationDialogComponent>,
    private http: HttpClient
  ) {}

  verifyOtp() {
    const payload = { phone: this.phone, otp: this.otp };
    this.http.post('/api/auth/verify-otp', payload).subscribe(
      () => {
        alert('OTP verified! Please set your new password.');
        this.dialogRef.close('OTP_VERIFIED'); // Return status
      },
      () => {
        alert('Invalid OTP. Please try again.');
      }
    );
  }
}

