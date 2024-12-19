import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailed-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-news.component.html',
  styleUrl: './detailed-news.component.css'
})
export class DetailedNewsComponent implements OnInit {
  @Input() news: any;
  @Output() backToTop = new EventEmitter<void>();


  baseImageUrl = 'http://www.local.com/NewsPortal/';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Retrieve the passed news data from state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['news']) {
      this.news = navigation.extras.state['news'];
    }
  }

  ngOnInit(): void {
    if (!this.news) {
      // If no news data, redirect to the news list page
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

  backToTopNews(): void {
    this.backToTop.emit();
  }
}
