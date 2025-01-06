import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NewUserComponent } from "./new-user/new-user.component";
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NewUserComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userDetails: any = [];
  username: string = '';
  isEditing = false;
  selectedFile: string | null = null;
  
  baseImageUrl: string = 'http://www.local.com/InquiryManagement/';

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Check if localStorage is available
    if (typeof window !== 'undefined' && localStorage) {
      const storedUser = localStorage.getItem('user');
  
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.username = user.username || 'Default Username';  // Default username in case it's missing
  
        // Fetch user details from the API
        if (user && user.username) {
          this.authService.getUserDetails(user.username).subscribe({
            next: (response) => {
              console.log('Full response:', response); // Log the full response to inspect its structure
  
              // Since `data` directly contains the user details, assign it here
              if (response && response.data) {
                this.userDetails = response.data;  // Assign the entire `data` object
                console.log('User details fetched:', this.userDetails);
              } else {
                // Handle case where `data` is missing
                console.warn('User details are missing in the response:', response);
              }
            },
            error: (err) => {
              console.error('Error fetching user details:', err);
            }
          });
        }
      } else {
        console.log('No user found in localStorage.');
      }
    } else {
      console.error('localStorage is not available.');
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

  // Validation Methods
  isNameValid(): boolean {
    return this.userDetails.name && this.userDetails.name.trim().length > 0;
  }

  isEmailValid(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.userDetails.emailID);
  }

  isPhoneValid(): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(this.userDetails.phoneNumber);
  }

  isPasswordValid(): boolean {
    return this.userDetails.password && this.userDetails.password.length >= 4;
  }

  saveChanges(): void {
    if (!this.isNameValid()) {
      this.alertService.error('Please enter a valid name.');
      return;
    }

    if (!this.isEmailValid()) {
      this.alertService.error('Please enter a valid email address.');
      return;
    }

    if (!this.isPhoneValid()) {
      this.alertService.error('Phone number must be 10 digits.');
      return;
    }

    if (!this.isPasswordValid()) {
      this.alertService.error('Password must be at least 4 characters.');
      return;
    }
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

    // Send the FormData to the backend
    this.authService.updateUserDetails(formData).subscribe({
      next: (response) => {
        this.alertService.success('User details updated successfully.');
        this.isEditing = false; // Disable editing after save
      },
      error: (error) => {
        console.error('Error updating user details:', error);
        this.alertService.error('There was an error updating your details. Please try again later.');
      },
    });
  }

  cancelEdit() {
    this.isEditing = false;
  }

  logout(): void {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('user'); 
    window.location.reload(); 
  }
}
