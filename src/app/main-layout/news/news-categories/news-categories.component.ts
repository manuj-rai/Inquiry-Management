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

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchAllTags();
  }

  // Fetch all tags
fetchAllTags(): void {
  this.newsService.getAllTags().subscribe({
    next: (response: any) => {
      this.tags = response.data;  // Assuming response has a 'data' property containing the tags
    },
    error: (err) => console.error('Error fetching tags:', err)
  });
}


    // Fetch news based on the selected tag
  fetchNewsByTag(tagName: string): void {
    this.selectedTag = tagName;
    this.newsService.getNewsByTag(tagName).subscribe({
      next: (data: any[]) => {
        this.newsList = data;
      },
      error: (err) => console.error('Error fetching news by tag:', err)
    });
  }
// Emit selected tag to parent component
selectTag(tagName: string): void {
  this.selectedTagEvent.emit(tagName);  // Emit the selected tag
}
}
