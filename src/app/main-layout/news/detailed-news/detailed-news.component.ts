import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteNewsComponent } from "../infinite-news/infinite-news.component";

@Component({
  selector: 'app-detailed-news',
  standalone: true,
  imports: [CommonModule, InfiniteNewsComponent],
  templateUrl: './detailed-news.component.html',
  styleUrl: './detailed-news.component.css'
})
export class DetailedNewsComponent implements OnInit {
  news: any;

  baseImageUrl = 'http://www.local.com/NewsPortal/';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Retrieve the passed news data from state
    const navigation = this.router.getCurrentNavigation();
    this.news = navigation?.extras?.state?.['news'];
    console.log('Received News Details:', this.news);
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    
    if (!this.news) {
      // Redirect back if no data is available
      this.router.navigate(['/news']);
    }
  }

  getImageUrl(imagePath: string): string {
    const cleanedPath = imagePath.replace('~/', '');
    return `${this.baseImageUrl}${cleanedPath}`;
  }


  viewNewsDetails(news: any): void {
    this.news = news; // Update the displayed news when a new item is clicked
  }

}
