import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import these modules
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Editor } from 'tinymce';


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
  tagSuggestions: any[] = [];
  selectedTags: string[] = [];
  


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

  onTagInputChange(query: string) {
    if (query.length >= 1) {
      this.newsService.getTagSuggestions(query).subscribe({
        next: (suggestions) => {
          console.log(suggestions); // Log the response to verify its structure
          this.tagSuggestions = suggestions;
        },
        error: (error) => {
          console.error('Error fetching tag suggestions', error);
        },
        complete: () => {
          console.log('Tag suggestions fetching complete');
        }
      });
    } else {
      this.tagSuggestions = [];
    }
  } 

    // Select a tag from the suggestions and add it to the input
    addTag(tag: string) {
      // Prevent adding the same tag again
      if (tag && !this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
        this.newsRequest.tagName = ''; // Clear input field
        this.tagSuggestions = []; // Clear suggestions after adding tag
      }
    }
  
    // Remove a tag from selectedTags list
    removeTag(tag: string) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }

}
