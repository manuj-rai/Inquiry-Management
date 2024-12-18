import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../services/news.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categorised-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorised-news.component.html',
  styleUrl: './categorised-news.component.css'
})
export class CategorisedNewsComponent implements OnInit {
  @Input() tagName: string = '';  // Get the tagName from the parent component
  newsList: any[] = [];  // Array to hold the news list

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tagName = params.get('tagName') || '';
    this.fetchNewsByTag(this.tagName);  // Fetch news when the component initializes
  });
  }

  ngOnChanges(): void {
    if (this.tagName) {
      this.fetchNewsByTag(this.tagName);
    }
  }

  // Fetch news for the selected tag
  fetchNewsByTag(tagName: string): void {
    this.newsService.getNewsByTag(tagName).subscribe({
      next: (response: any) => {
        console.log('Loaded News:', response.data);
        this.newsList = response.data; // Adjust based on API response structure
      },
      error: (err) => console.error('Error fetching news by tag:', err)
    });
  }

  getImageUrl(imagePath: string): string {
    const baseUrl = 'http://www.local.com/NewsPortal/';  // Your base image URL
    return `${baseUrl}${imagePath.replace('~/', '')}`;
  }
  
  viewNewsDetails(news: any): void {
    console.log('Selected News:', news);
    this.router.navigate(['/news-details'], { state: { news } });
  }

}
