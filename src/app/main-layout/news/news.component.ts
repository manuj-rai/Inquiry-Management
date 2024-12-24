import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { DatePipe } from '@angular/common';  
import { CommonModule } from "@angular/common";
import { NewsCategoriesComponent } from "./news-categories/news-categories.component";
import { CategorisedNewsComponent } from "./categorised-news/categorised-news.component";
import { InfiniteNewsComponent } from "./infinite-news/infinite-news.component";
import { DetailedNewsComponent } from "./detailed-news/detailed-news.component";
import { ScrollToTopComponent } from "../../Reusables/Scroll-To-Top";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, NewsCategoriesComponent, CategorisedNewsComponent, InfiniteNewsComponent, DetailedNewsComponent, ScrollToTopComponent],
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
  selectedNews: any = null;
  showTopNews: boolean = true;

  baseImageUrl = 'http://www.local.com/NewsPortal/';

  constructor(
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {
    this.fetchTopNews();
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
 

  // Fetch top news for the slider
  fetchTopNews(): void {
    const take = 5;
    const skip = 0;
  
    this.newsService.getTopNews(take, skip).subscribe({
      next: (response: any) => { 
        if (response?.data) {
          this.topNews = response.data;
          this.startAutoSlide();
          this.rightSideNews = response.data.slice(0, 3); // News for the right-hand side
        } else {
          console.error('No data found in the response');
        }
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

  getImageUrl(imagePath: string): string {
    const cleanedPath = imagePath.replace('~/', '');
    return `${this.baseImageUrl}${cleanedPath}`;
  }

  // Handle selected tag event from child component
  onTagSelected(tagName: string): void {
    this.selectedTag = tagName;  // Set the selected tag
  }

  viewNewsDetails(news: any): void {
    this.selectedNews = news;
    this.showTopNews = false; 
  }


  // Method to go back to top news
  backToTopNews(): void {
    this.selectedNews = null;
    this.showTopNews = true;
  }
}