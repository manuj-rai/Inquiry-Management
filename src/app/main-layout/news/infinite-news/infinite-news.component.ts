import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-infinite-news',
  standalone: true,
  imports: [LazyLoadImageModule, CommonModule, NgxSkeletonLoaderModule],
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
    if (this.isLoading) {
      return; // Prevent multiple calls or unnecessary calls after all news is loaded
    }
  
    this.isLoading = true;

    this.newsService.getActiveNews(pageIndex, pageSize).pipe(
      delay(1000)
    ).subscribe({
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
          this.isLoading = false;
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
    if (this.isLoading) return;  // Prevent trigger while loading
  
    // Use a buffer threshold, for example 80% of the page height
    const threshold = document.body.scrollHeight;
    if ((window.innerHeight + window.scrollY) >= threshold) {
      // Trigger data load
      this.fetchPaginatedNews();
    }
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
