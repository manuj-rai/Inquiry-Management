import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userDetails: any = {};

  baseImageUrl: string = 'http://www.local.com/InquiryManagement/';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!); 
    if (user && user.username) {
      this.authService.getUserDetails(user.username).subscribe({
        next: (details) => {
          this.userDetails = details;
          console.log(this.userDetails);

        },
        
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    }
  }

  getProfilePictureUrl(): string {
    const cleanedPath = this.userDetails.profilePicture.replace('~/', '');
    return `${this.baseImageUrl}${cleanedPath}`;
  }

  editProfile(): void {
    // Navigate to the profile editing page or open a modal for editing
    console.log('Edit Profile');
  }

  logout(): void {
    // Handle logout logic
    console.log('User logged out');
  }

}
