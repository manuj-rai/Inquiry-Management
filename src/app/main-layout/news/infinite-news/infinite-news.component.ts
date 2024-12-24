import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infinite-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-news.component.html',
  styleUrl: './infinite-news.component.css'
})
export class InfiniteNewsComponent implements OnInit  {
  @Output() newsClicked = new EventEmitter<any>();
  
  newsList: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 5;
  totalNewsCount: number = 0;
  isLoading: boolean = false;
  selectedNews: any = null;
  showTopNews: boolean = true;

  baseImageUrl = 'http://www.local.com/NewsPortal/';

  constructor(
    private router: Router,
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {
    this.fetchPaginatedNews();
  }

  fetchPaginatedNews(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize): void {
    if (this.isLoading) return; // Prevent multiple calls
  
    this.isLoading = true;
  
    this.newsService.getActiveNews(pageIndex, pageSize).subscribe({
      next: (response: any) => {
        if (response?.data?.newsContent && Array.isArray(response.data.newsContent)) {
          
          // Append new data for infinite scroll
          this.newsList = [...this.newsList, ...response.data.newsContent];
          this.pageIndex++; // Increment the page index for the next API call
  
          // Update total news count
          this.totalNewsCount = response.data.totalCount || 0;
  
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
    }, 2000);  // 1000ms (2 second) delay before loading more news
  }

  getImageUrl(imagePath: string): string {
    const cleanedPath = imagePath.replace('~/', '');
    return `${this.baseImageUrl}${cleanedPath}`;
  }

  viewNewsDetails(news: any): void {
    this.newsClicked.emit(news);
    this.selectedNews = news;
    this.showTopNews = false; 
    window.scrollTo({ top: 500, behavior: 'smooth' });  }

}
