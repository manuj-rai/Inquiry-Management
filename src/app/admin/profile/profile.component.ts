import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NewUserComponent } from "./new-user/new-user.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NewUserComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userDetails: any = {};
  username: string = '';
  isEditing = false;
  selectedFile: string | null = null;
  
  baseImageUrl: string = 'http://www.local.com/InquiryManagement/';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Ensure that localStorage is available before accessing
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.username = user.username || 'Default Username';

      // Now, fetch the user details from the API
      if (user && user.username) {
        this.authService.getUserDetails(user.username).subscribe({
          next: (details) => {
            this.userDetails = details;
            console.log('User details fetched:', this.userDetails);
          },
          error: (err) => {
            console.error('Error fetching user details:', err);
          }
        });
      }
    } else {
      console.log('No user found in localStorage in ngOnInit');
    }
  }

  getProfilePictureUrl(): string {
    const cleanedPath = this.userDetails.profilePicture.replace('~/', '');
    return `${this.baseImageUrl}${cleanedPath}`;
  }

  toggleEdit(editMode: boolean) {
    this.isEditing = editMode;
  }

  onProfilePictureChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result as string; // Set the selected image as base64
      };
      this.userDetails.profilePicture = file; // Store the file for FormData
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    // Ensure the form is valid (optional)
    if (this.userDetails.name && this.userDetails.emailID && this.userDetails.phoneNumber && this.userDetails.password) {
      const formData = new FormData();
      formData.append('userID', this.userDetails.userID);
      formData.append('UserName', this.username);
      formData.append('Name', this.userDetails.name);
      formData.append('EmailID', this.userDetails.emailID);
      formData.append('PhoneNumber', this.userDetails.phoneNumber);
      formData.append('Password', this.userDetails.password);
  
      // Append the profile picture file if selected
      if (this.userDetails.profilePicture) {
        formData.append('ProfilePicture', this.userDetails.profilePicture);
      }
  
      // Send the formData to the backend
      this.authService.updateUserDetails(formData).subscribe({
        next: (response) => {
          alert('User details updated successfully:');
          this.isEditing = false;  
        },
        error: (error) => {
          console.error('Error updating user details:', error);
          alert('There was an error updating your details. Please try again later.');
        }
      });
    } else {
      alert('Please fill in all the required fields.');
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }

  logout(): void {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']);  
  }
}
