import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from '../../main-layout/login/sign-up/sign-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, CommonModule, LazyLoadImageModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  activeUser: any;
  users: any[] = [];  // Array to hold paginated users
  currentPage: number = 1; // Current page
  pageSize: number = 5; // Number of users per page
  totalUsers: number = 0; // Total users count
  message: string = ''; // Message to display success or error

  baseImageUrl: string = 'http://www.local.com/InquiryManagement/';

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers(); // Fetch the first page of users
    const activeUser = JSON.parse(localStorage.getItem('user') || '{}');
    const role = activeUser?.role; // Access the role from the user object
    this.activeUser = activeUser;

  }

  getUsers(): void {
    this.authService.getPaginatedUsers(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.users = response.data; 
      },
      (error) => {
        this.message = `Error fetching users: ${error.error.header.desc}`;
        console.error('Error fetching users:', error);
      }
    );
  }
  

  getProfilePictureUrl(user: any): string {
    // Ensure user has a profilePicture property and replace '~/'
    if (user && user.profilePicture) {
      const cleanedPath = user.profilePicture.replace('~/', '');  // Remove '~/'
      return `${this.baseImageUrl}${cleanedPath}`;  // Construct full URL
    }
    return 'default-profile-picture-url';  // Return a default image URL if no profile picture exists
  }

  getTimeAgo(createdDate: string): string {
    const createdDateUtc = new Date(createdDate).getTime();
    
    // Adjust current time to UTC - 5:30 (IST offset)
    const currentUtc = new Date().getTime();
    const adjustedTime = currentUtc - (5 * 60 * 60 * 1000 + 30 * 60 * 1000) + (80 * 60 * 1000); // Subtract 5 hrs 30 min
  
    const timeDifference = adjustedTime - createdDateUtc;
    const minutes = Math.floor(timeDifference / 60000);  // Convert to minutes
  
    if (minutes < 60) {
      return `${minutes} Min Ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} Hours Ago`;
    }
  
    const days = Math.floor(hours / 24);
    return `${days} Days Ago`;
  } 

  updateIsAdmin(userID: number, isAdmin: boolean): void {
    this.authService.updateIsAdmin(userID, isAdmin).subscribe(
      (response) => {
        this.message = response.data; // Assuming the response contains success message
        this.getUsers(); // Refresh the list of users after update
      },
      (error) => {
        this.message = `Error updating isAdmin: ${error.error.header.desc}`;
        console.error('Error updating isAdmin:', error);
      }
    );
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getUsers(); // Fetch users for the new page
  }

  openSignupDialog() {
    this.dialog.open(SignUpComponent);
  }
}
