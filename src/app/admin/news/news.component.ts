import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import these modules
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Editor } from 'tinymce';
import { AlertService } from '../../services/alert.service';


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
  tagSuggestions: { tagName: string }[] = [];
  selectedTags: string[] = []; 
  currentTag: string = '';

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
    authorID: 0, 
    createdBy: '', 
  };

  tinyConfig = {
    height: 270,
    menubar: true, // menu bar
    toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | code',
    content_style: `
      body { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        font-size: 14px; 
        color: #000;
        line-height: 1.6;
      }
      .tox-tinymce {
        border: 1px solid #161a2f !important;
        border-radius: 4px !important;
      }
      .mce-content-body {
        background-color: #161a2f !important;
        color: #fff;
      }
    `,
    branding: false, 
    skin: 'oxide-dark', 
    content_css: '//cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css', 
    setup: function (editor: Editor) {
      editor.on('init', function () {
        editor.getDoc().body.style.backgroundColor = '#161a2f';
      });
    }
  };
  

  constructor(
    private alertService: AlertService,
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
    // Check each field individually and show a specific alert for the missing fields
    if (!this.newsRequest.title) {
      this.alertService.warning('Title is required!');
      return;
    }

    if (!this.newsRequest.bigImage) {
      this.alertService.warning('Big Image is required!');
      return;
    }

    if (!this.newsRequest.smallImage) {
      this.alertService.warning('Small Image is required!');
      return;
    }

    if (!this.newsRequest.shortDesc) {
      this.alertService.warning('Short Description is required!');
      return;
    }

    if (!this.newsRequest.newsContent) {
      this.alertService.warning('News Content is required!');
      return;
    }

    if (!this.newsRequest.CopyWriteText) {
      this.alertService.warning('CopyWrite Text is required!');
      return;
    }

    if (!this.newsRequest.tagName) {
      this.alertService.warning('Tag Name is required!');
      return;
    }

    if (!this.newsRequest.postingDate) {
      this.alertService.warning('Posting Date is required!');
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
        this.alertService.success('News added successfully');
        this.loadActiveNews(); 
      },
      error => {
        console.error('Error adding news', error);
        this.alertService.error('Error adding news');
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

  // Fetch suggestions dynamically as user types
  onTagInputChange(query: string): void {
    if (query.length >= 1) {
      this.newsService.getTagSuggestions(query).subscribe({
        next: (suggestions: any[]) => {
          this.tagSuggestions = suggestions;
        },
        error: (err) => {
          console.error('Error fetching tag suggestions:', err);
        }
      });
    } else {
      this.tagSuggestions = []; // Clear suggestions if input is empty
    }
  }

  // Add a tag from suggestions to the list
  addTag(tag: string): void {
    if (tag && !this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag); // Add tag to selected list
      this.updateTagNames(); // Update the tag names as a comma-separated string
      this.currentTag = ''; // Clear input box for new search
      this.tagSuggestions = []; // Clear suggestions
    }
  }

  // Remove a tag from the selected list
  removeTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag); // Remove the tag from the list
    this.updateTagNames(); // Update the tag names as a comma-separated string
  }

  updateTagNames(): void {
    this.newsRequest.tagName = this.selectedTags.join(',');
  }
}
