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
    
    selectedDepartment: string = '';
    selectedFile: File | null = null;;

      constructor(
        private http: HttpClient
      ) {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

    // Submit the form
    onSubmit(userForm: NgForm): void {
      if (userForm.valid) {
        const formData = new FormData();
        
        // Append form data to FormData
        formData.append('departmentId', this.selectedDepartment.toString());
        formData.append('name', userForm.value.name);
        formData.append('username', userForm.value.username);
        formData.append('email', userForm.value.email);
        formData.append('phoneNumber', userForm.value.phoneNumber);
        if (this.selectedFile) {
          formData.append('profilePic', this.selectedFile, this.selectedFile.name);
        }
  
        
        // Call the API to submit the form
        this.submitUserData(formData).subscribe(
          (response) => {
            console.log('User submitted successfully:', response);
          },
          (error) => {
            console.error('Error submitting form:', error);
          }
        );
      }
    }
  
    // Submit the user data (API call)
    submitUserData(formData: FormData): Observable<any> {
      const apiUrl = 'https://your-api-url.com/upload-user'; // replace with your API URL
      return this.http.post(apiUrl, formData);
    }

}
