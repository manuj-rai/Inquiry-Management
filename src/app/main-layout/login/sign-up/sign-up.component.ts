import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule, 
    MatIconModule,
    MatTooltipModule,
    FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  departments = [
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'IT' },
  ];
  fileName: string = '';
  selectedDepartment: string = '';
  selectedFilePreview: string | null = null; // For Base64 preview
  originalFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private alertService : AlertService) {
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.originalFile = file;
    }
  }

  // Submit the form
  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      if (!this.originalFile) {
        this.alertService.warning('Please select a profile picture.');
        return;
      }

      const formData = new FormData();
      
      // Append form data to FormData
      formData.append('departmentId', this.selectedDepartment.toString());
      formData.append('name', userForm.value.name);
      formData.append('username', userForm.value.username);
      formData.append('email', userForm.value.email);
      formData.append('password', userForm.value.password);
      formData.append('phoneNumber', userForm.value.phoneNumber);
      formData.append('ProfilePicture', this.originalFile);


    
  this.http.post('https://f2f.myapi.com/register', formData)
    .subscribe({
      next: (response: any) => {
        if (response?.header?.statusCode === 105) {
          this.alertService.error('Email already used, please login or use different email.');
        } else {
          this.alertService.success('User registered successfully!');
        }
      },
      error: (error) => console.error('Error:', error)
      });
      }else {
        this.alertService.error("Please fill in all required details.");
      }
    }

    onProfilePictureChange(event: any): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        this.originalFile = file; // Store the original file
    
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedFilePreview = reader.result as string; // Store the Base64 preview
        };
        reader.readAsDataURL(file);
      }
    }

}
