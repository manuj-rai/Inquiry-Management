import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'scroll-to-top',
  standalone: true,
  imports:[CommonModule],

  template: `<!-- Scroll to Top Button -->
    <button *ngIf="isVisible" class="Btn" (click)="scrollToTop()">
      <svg height="1.2em" class="arrow" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path></svg>
      <p class="text">Back to Top</p>
    </button>
  `,

  styles: [`
    .Btn {
    width: 45px;
    height: 45px;
    background: linear-gradient(#171a2e, #242b44);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    position: fixed;
    border: none;
    right: 10px;
    bottom: 20px;
    }

    .arrow path {
    fill: white;
    }

    .text {
    font-size: 0.7em;
    width: 100px;
    position: absolute;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: -25px;
    opacity: 0;
    transition-duration: .7s;
    }

    .Btn:hover .text {
    opacity: 1;
    transition-duration: .7s;
    }

    .Btn:hover .arrow {
    animation: slide-in-bottom .7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    @keyframes slide-in-bottom {
    0% {
        transform: translateY(10px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
    }

  `]
})

export class AppComponent {
    isVisible = false; // Flag to show or hide the button

    // Listen to the scroll event
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      // Check if the page is scrolled down a certain amount (e.g., 200px)
      if (window.scrollY > 800) {
        this.isVisible = true; // Show the button
      } else {
        this.isVisible = false; // Hide the button
      }
    }
  
    // Scroll to the top of the page when the button is clicked
    scrollToTop(): void {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
