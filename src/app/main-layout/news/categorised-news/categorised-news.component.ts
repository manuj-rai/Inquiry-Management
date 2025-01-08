import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../services/news.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@Component({
  selector: 'app-categorised-news',
  standalone: true,
  imports: [LazyLoadImageModule, CommonModule],
  templateUrl: './categorised-news.component.html',
  styleUrl: './categorised-news.component.css'
})
export class CategorisedNewsComponent implements OnInit {
  @Input() tagName: string = '';  
  @Output() newsClicked: EventEmitter<any> = new EventEmitter();
  newsList: any[] = [];  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.tagName = params.get('tagName') || '';
  });
  }

  ngOnChanges(): void {
    if (this.tagName) {
      this.fetchNewsByTag(this.tagName);
    }
  }

  fetchNewsByTag(tagName: string): void {
    this.newsService.getNewsByTag(tagName).subscribe({
      next: (response: any) => {
        console.log('Loaded News:', response.data);
        this.newsList = response.data; 
      },
      error: (err) => console.error('Error fetching news by tag:', err)
    });
  }

  getImageUrl(imagePath: string): string {
    const baseUrl = 'http://www.local.com/NewsPortal/';  
    return `${baseUrl}${imagePath.replace('~/', '')}`;
  }
  
  viewNewsDetails(news: any): void {
    this.newsClicked.emit(news);
    window.scrollTo({ top: 500, behavior: 'smooth' });
  }

}
