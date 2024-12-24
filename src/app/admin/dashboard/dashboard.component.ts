import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../../services/inquiry.service';
import { NewsService } from '../../services/news.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { TodoComponent } from "../../Reusables/Todo";
import { WeatherForecastComponent } from "../../Reusables/Weather";
import { ReminderComponent } from "../../Reusables/Reminder";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoComponent, WeatherForecastComponent, ReminderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  inquiries: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  totalPages: number = 0; 

    // Filters
    gender: string = '';
    country: string = '';
    status: string = '';

  countries: string[] = []; 
  totalNewsCount: number = 0;
  totalUsers: number = 0;
  users: any[] = [];
  baseImageUrl: string = 'http://www.local.com/InquiryManagement/';

  constructor(private inquiryService: InquiryService,
    private newsService: NewsService,
    private authService: AuthService,
    private http: HttpClient,) {}

  ngOnInit(): void {
    this.fetchInquiries();
    this.fetchTotalNewsCount();
    this.getRecentUsers();
    this.fetchCountries();
  }

  fetchInquiries(): void {
    this.inquiryService.getPaginatedUsers(this.currentPage, this.pageSize, this.gender, this.country, this.status).subscribe({
      next: (response) => {
        this.inquiries = response.data;
        this.totalItems = response.totalCount;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);  // Set total pages
      },
      error: (err) => {
        console.error('Error fetching inquiries:', err);
      }
    });
  }

  confirmDelete(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'question',
      background: '#222b45',
      color: '#fff',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateStatus(Number(id), 'delete');
        Swal.fire({
          title: '<strong>Deleted!</strong>',
          html: '<p style="color: #b5b5b5;">The inquiry has been successfully deleted.</p>',
          icon: 'success',
          background: '#222b45', // Dark success background
          color: '#fff', // Light text
          confirmButtonColor: '#28a745', // Green confirm button
          customClass: {
            popup: 'swal-popup',
            title: 'swal-title',
            htmlContainer: 'swal-html-container',
            confirmButton: 'swal-confirm-button',
          },
          buttonsStyling: false,
        });
      }
    });
  }

  // Action handling methods (Approve, Unapprove, Delete)
  updateStatus(inquiryId: number, action: string): void {
    this.inquiryService.updateInquiryStatus(inquiryId, action).subscribe({
      next: () => {
        // After action, refetch the inquiries
        this.fetchInquiries();
      },
      error: (err) => {
        console.error(`Error updating status for inquiry ${inquiryId}:`, err);
      }
    });
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchInquiries(); // Fetch new page of inquiries
    }
  }

    // Reset filters and fetch data
    resetFilters(): void {
      this.gender = '';
      this.country = '';
      this.status = '';
      this.fetchInquiries();
    }

  applyFilters(): void {
    this.fetchInquiries();
  }

  // Fetch countries from REST Countries API
  fetchCountries(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe({
      next: (response) => {
        // Extract and sort country names
        this.countries = response
          .map((country) => country.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
      },
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

  // Fetch total news count from API
  fetchTotalNewsCount(): void {
    this.newsService.getActiveNews(1, 10).subscribe({
      next: (response) => {
        // Extract total count from the API response
        this.totalNewsCount = response.data.totalCount; // TotalCount is in the response
      },
      error: (err) => {
        console.error('Error fetching news count:', err);
      }
    });
  }

  // Method to get the top 5 recent users from the API
  getRecentUsers(): void {
    this.authService.getRecentUsers().subscribe(
      (data) => {
        this.users = data;  // Store the API response in the users array
        if (this.users.length > 0 && this.users[0].totalUsers !== undefined) {
          this.totalUsers = this.users[0].totalUsers;  // Extract totalUsers from the first item
        }
        console.log(this.users);
      },
      (error) => {
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

  // Method to format "CreatedDate" into a human-readable format like "X minutes ago"
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

  getCircleBackground(percentage: number): string {
    return `conic-gradient(
              #36b 0% ${percentage}%,  /* Filled portion (green) */
               #8f9bb3 ${percentage}% 100%  /* Unfilled portion (grey) */
            )`;
  }

}
