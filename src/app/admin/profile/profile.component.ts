import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userDetails: any = {};
  isEditing = false;

  baseImageUrl: string = 'http://www.local.com/InquiryManagement/';

  constructor(private authService: AuthService,
    private router: Router
  ) {}

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

  toggleEdit(editMode: boolean) {
    this.isEditing = editMode;
  }

  saveChanges() {
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  logout(): void {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']);  }

}
