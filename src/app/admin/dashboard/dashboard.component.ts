import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../../services/inquiry.service';


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
  totalPages: number = 0;  // Store the total pages to avoid recalculating

  constructor(private inquiryService: InquiryService) {}

  ngOnInit(): void {
    this.fetchInquiries();
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
}
