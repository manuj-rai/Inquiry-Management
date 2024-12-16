import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import these modules
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, EditorModule, CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  newsList: any[] = []; // Array to store news items
  pageIndex: number = 1; // Current page index
  pageSize: number = 2; // Page size
  userDetails: any;

  baseImageUrl = 'http://www.local.com/NewsPortal/';

  newsRequest = {
    title: '',
    shortDesc: '',
    newsContent: '',
    postingDate: '',
    CopyWriteText: '',
    tagName: '',
    bigImage: null as File | null,
    smallImage: null as File | null,
    authorID: 0, // This will hold the logged-in user's ID
    createdBy: '', // This will hold the logged-in user's name
  };

  tinyConfig = {
    height: 270,
    menubar: true, // Hide menu bar
    toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | code',
    content_style: `
      body { 
        font-family: Arial, sans-serif; 
        font-size: 14px; 
        background-color: #161a2f; 
        color: #fff;
      }
      .tox-toolbar_primary {
        background-color: #161a2f;
        color: white;
        border: 1px solid #101426;
      }
      .tox-menubar {
        background: transparent;
      }
    `,
    branding: false // Remove "Powered by Tiny" branding
  };

  constructor(
    private authService: AuthService,
    private newsService: NewsService)
  {}

  ngOnInit(): void {
    this.loadActiveNews(); 
    const user = JSON.parse(localStorage.getItem('user')!); 
    if (user && user.username) {
      this.authService.getUserDetails(user.username).subscribe({
        next: (details) => {
          this.userDetails = details; // Store user details
          console.log(this.userDetails); // You can log the details for debugging

          // After fetching user details, update authorID and createdBy
          this.newsRequest.authorID = this.userDetails.userID; // Assuming userID is in the response
          this.newsRequest.createdBy = this.userDetails.name; // Assuming username is in the response
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.newsRequest.title || !this.newsRequest.shortDesc || !this.newsRequest.newsContent || !this.newsRequest.postingDate) {
      alert('Please fill all the required fields!');
      return;
    }

    const formData = new FormData();
    
    formData.append('title', this.newsRequest.title);
    formData.append('shortDesc', this.newsRequest.shortDesc);
    formData.append('newsContent', this.newsRequest.newsContent);
    formData.append('postingDate', this.newsRequest.postingDate);
    formData.append('CopyWriteText', this.newsRequest.CopyWriteText);
    formData.append('tagName', this.newsRequest.tagName);

    if (this.newsRequest.bigImage) {
      formData.append('bigImage', this.newsRequest.bigImage, this.newsRequest.bigImage.name);
    }
    if (this.newsRequest.smallImage) {
      formData.append('smallImage', this.newsRequest.smallImage, this.newsRequest.smallImage.name);
    }

    formData.append('authorID', String(this.newsRequest.authorID)); // Ensure authorID is included
    formData.append('createdBy', this.newsRequest.createdBy); // Ensure createdBy is included

    this.newsService.addNews(formData).subscribe(
      response => {
        console.log('News added successfully', response);
        alert('News added successfully');
        this.loadActiveNews(); 
      },
      error => {
        console.error('Error adding news', error);
        alert('Error adding news');
      }
    );
  }
  
  // Handle file changes (big image or small image)
  onBigImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newsRequest.bigImage = file;
    }
  }

  onSmallImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newsRequest.smallImage = file;
    }
  }


  // Method to load active news
  loadActiveNews(): void {
    this.newsService.getActiveNews(this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        console.log('News data fetched:', response);
        this.newsList = response.data.newsContent; // Assuming the API response is an array
      },
      error: (err) => {
        console.error('Error fetching news:', err);
      }
    });
  }

  getImageUrl(imagePath: string): string {
    const cleanedPath = imagePath.replace('~/', '');
    return `${this.baseImageUrl}${cleanedPath}`;
  }

}
