import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../../services/inquiry.service';
import { NewsService } from '../../services/news.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  inquiries: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;  
  totalNewsCount: number = 0;
  users: any[] = [];
  baseImageUrl: string = 'http://www.local.com/InquiryManagement/';

  constructor(private inquiryService: InquiryService,
    private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchInquiries();
    this.fetchTotalNewsCount();
    this.getRecentUsers();
  }

  fetchInquiries(): void {
    this.inquiryService.getPaginatedUsers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.inquiries = response.data;
        this.totalItems = response.totalCount;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);  // Set the total pages
      },
      error: (err) => {
        console.error('Error fetching inquiries:', err);
      }
    });
  }

  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.fetchInquiries();
    }
  }

  // Fetch total news count from API
  fetchTotalNewsCount(): void {
    this.newsService.getActiveNews(1, 10).subscribe({
      next: (response) => {
        // Extract total count from the API response
        this.totalNewsCount = response.totalCount; // TotalCount is in the response
      },
      error: (err) => {
        console.error('Error fetching news count:', err);
      }
    });
  }

  // Method to get the top 5 recent users from the API
  getRecentUsers(): void {
    this.inquiryService.getRecentUsers().subscribe(
      (data) => {
        this.users = data;  // Store the API response in the users array
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
    const timeDifference = new Date().getTime() - new Date(createdDate).getTime();
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

}
