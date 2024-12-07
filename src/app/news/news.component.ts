import { Component, OnInit, HostListener } from '@angular/core';
import { NewsService } from '../services/news.service';
import { DatePipe } from '@angular/common';  // Import DatePipe
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [DatePipe],
})
export class NewsComponent implements OnInit {
  newsList: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 5;
  totalNewsCount: number = 0;
  isLoading: boolean = false;

  baseImageUrl = 'http://www.local.com/NewsPortal/';

  constructor(
    private newsService: NewsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fetchPaginatedNews();
  }

  fetchPaginatedNews(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize): void {
    if (this.isLoading) return;  // Prevent multiple calls

    this.isLoading = true;

    this.newsService.getActiveNews(pageIndex, pageSize).subscribe({
      next: (response: any) => {
        if (response?.data && Array.isArray(response.data)) {
          console.log('Loaded news:', response.data);

          // Append new data for infinite scroll
          this.newsList = [...this.newsList, ...response.data];
          this.pageIndex++; // Increment the page index for the next API call

          // Update total news count if available (optional)
          this.totalNewsCount = response.totalCount || 0;

          // Check if all news are loaded
          if (this.newsList.length >= this.totalNewsCount) {
            this.isLoading = false;
          }
        } else {
          console.error('Invalid response structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching news:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isLoading) return;  // Prevent scroll triggering while loading

    // Add a delay before checking the scroll position and loading more news
    setTimeout(() => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // Check if not all news are loaded and then fetch more
        if (this.newsList.length < this.totalNewsCount) {
          this.fetchPaginatedNews();
        }
      }
    }, 1000);  // 1000ms (1 second) delay before loading more news
  }

  getImageUrl(imagePath: string): string {
    const cleanedPath = imagePath.replace('~/', '');
    return `${this.baseImageUrl}${cleanedPath}`;
  }
}