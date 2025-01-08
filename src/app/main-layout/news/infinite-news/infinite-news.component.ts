import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { CommonModule } from '@angular/common';
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
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {
    this.fetchPaginatedNews();
  }

  fetchPaginatedNews(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize): void {
    if (this.isLoading) {
      return; 
    }
  
    this.isLoading = true;

    this.newsService.getActiveNews(pageIndex, pageSize).pipe(
      delay(1000)
    ).subscribe({
      next: (response: any) => {
        if (response?.data?.newsContent && Array.isArray(response.data.newsContent)) {
          
          this.newsList = [...this.newsList, ...response.data.newsContent];
          this.pageIndex++; 
  
          this.totalNewsCount = response.data.totalCount || 0;
  
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
    if (this.isLoading) return;  
  
    const threshold = document.body.scrollHeight;
    if ((window.innerHeight + window.scrollY) >= threshold) {
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
