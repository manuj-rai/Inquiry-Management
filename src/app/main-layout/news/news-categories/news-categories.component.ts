import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-categories.component.html',
  styleUrl: './news-categories.component.css'
})
export class NewsCategoriesComponent implements OnInit {
  @Output() selectedTagEvent = new EventEmitter<string>();
  tags: any[] = [];
  selectedTag: string = '';  
  newsList: any[] = [];  
  isLoading: boolean = true; 
  skeletonTags: number[] = Array(6).fill(0);   

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    setTimeout(() => {
    this.fetchAllTags();
  }, 1000);
  }

  fetchAllTags(): void {
    this.newsService.getAllTags().subscribe({
      next: (response: any) => {
        this.tags = response.data;  
        this.isLoading = false;
      },
      error: (err) => console.error('Error fetching tags:', err)
    });
  }

  fetchNewsByTag(tagName: string): void {
    this.selectedTag = tagName;
    this.newsService.getNewsByTag(tagName).subscribe({
      next: (data: any[]) => {
        this.newsList = data;
      },
      error: (err) => console.error('Error fetching news by tag:', err)
    });
  }
  
  selectTag(tagName: string): void {
    this.selectedTagEvent.emit(tagName);  
  }
}
