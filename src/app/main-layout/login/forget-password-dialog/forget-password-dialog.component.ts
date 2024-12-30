import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password-dialog',
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './forget-password-dialog.component.html',
  styleUrl: './forget-password-dialog.component.css'
})
export class ForgetPasswordDialogComponent {
  email: string = '';

  constructor(
    private dialogRef: MatDialogRef<ForgetPasswordDialogComponent>,
    private http: HttpClient
  ) {}

  onSubmit() {
    const payload = { email: this.email };
    this.http.post('/api/auth/forget-password', payload).subscribe(
      (response) => {
        alert('Password reset link sent to your email!');
        this.dialogRef.close();
      },
      (error) => {
        console.error(error);
        alert('Error sending reset email. Please try again.');
      }
    );
  }
}
