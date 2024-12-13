import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
    departments = [
      { id: 1, name: 'Sales' },
      { id: 2, name: 'Marketing' },
      { id: 3, name: 'IT' },
    ];
    fileName: string = '';
    selectedDepartment: string = '';
    selectedFile: File | null = null;;

      constructor(
        private http: HttpClient
      ) {}

      onFileChange(event: any): void {
        const file = event.target.files[0];  
        if (file) {
          this.fileName = file.name; 
          this.selectedFile = file; 
        }
      }

      // Submit the form
      onSubmit(userForm: NgForm): void {
        if (userForm.valid) {
          if (!this.selectedFile) {
            alert('Please select a profile picture.');
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
          formData.append('ProfilePicture', this.selectedFile);

  
        
          this.http.post('https://localhost:7158/register', formData)
          .subscribe({
            next: (response) => alert('User registered successfully!'),
            error: (error) => console.error('Error:', error)
          });
        }
      }
}
