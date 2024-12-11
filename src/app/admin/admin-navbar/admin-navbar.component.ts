import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
  standalone:true,
  imports:[CommonModule]
})

export class AdminNavbarComponent implements OnInit {
  userDetails: any = {};
  baseImageUrl: string = 'http://www.local.com/InquiryManagement/';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!); // Retrieve logged-in user details
    if (user && user.username) {
      this.authService.getUserDetails(user.username).subscribe({
        next: (details) => {
          this.userDetails = details;
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

  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown')) {
      this.isDropdownVisible = false;
    }
  }
}
