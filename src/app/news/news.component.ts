import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { DatePipe } from '@angular/common';  // Import DatePipe
import { CommonModule } from "@angular/common";
import { NewsCategoriesComponent } from "./news-categories/news-categories.component";
import { CategorisedNewsComponent } from "./categorised-news/categorised-news.component";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, NewsCategoriesComponent, CategorisedNewsComponent],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [DatePipe],
})
export class NewsComponent implements OnInit, OnDestroy {
  selectedTag: string = '';
  newsList: any[] = [];
  topNews: any[] = [];
  currentSlideIndex: number = 0;
  autoSlideInterval: any;
  rightSideNews: any[] = [];
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
    this.fetchTopNews();
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  fetchPaginatedNews(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize): void {
    if (this.isLoading) return; // Prevent multiple calls
  
    this.isLoading = true;
  
    this.newsService.getActiveNews(pageIndex, pageSize).subscribe({
      next: (response: any) => {
        if (response?.data?.newsContent && Array.isArray(response.data.newsContent)) {
          console.log('Loaded news:', response.data.newsContent);
  
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
  

  // Fetch top news for the slider
  fetchTopNews(): void {
    const take = 5;
    const skip = 0;

    this.newsService.getTopNews(take, skip).subscribe({
      next: (data: any[]) => {
        console.log('Loaded top news:', data);

        this.topNews = data; 
        this.startAutoSlide();
        this.rightSideNews = data.slice(0, 3); // News for the right-hand side
      },
      error: (err) => console.error('Error fetching top news:', err)
    });
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      // Increment slide index and reset if at the last slide
      this.currentSlideIndex =
        (this.currentSlideIndex + 1) % this.topNews.length;
    }, 3000); // Change slides every 3 seconds
  }

  goToSlide(index: number): void {
    // Allow manual navigation
    this.currentSlideIndex = index;
    clearInterval(this.autoSlideInterval); // Stop auto-slide on manual navigation
    this.startAutoSlide(); // Restart auto-slide
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

  // Handle selected tag event from child component
  onTagSelected(tagName: string): void {
    this.selectedTag = tagName;  // Set the selected tag
  }
}