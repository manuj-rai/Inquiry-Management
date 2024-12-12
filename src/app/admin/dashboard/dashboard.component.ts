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

  constructor(private inquiryService: InquiryService,
    private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchInquiries();
    this.fetchTotalNewsCount();
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

}
