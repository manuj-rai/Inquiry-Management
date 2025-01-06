import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  ngOnInit(): void {
    // Select DOM elements
    let PAGE_NOT_FOUND: HTMLElement | null = document.querySelector(".caution__tape .PAGE_NOT_FOUND");
    let tape__center: HTMLElement | null = document.getElementById("caution__tape__center");
    let tape__left: HTMLElement | null = document.getElementById("caution__tape__left");
    let ERROR: HTMLElement | null = document.querySelector(".caution__tape .ERROR");
    let body_Width: number = (document.getElementById("body") as HTMLElement).clientWidth;

    // Calculate the number of elements to add based on width
    let warning_len: number = ((body_Width / (PAGE_NOT_FOUND ? PAGE_NOT_FOUND.clientWidth : 1)) / 1.8) - 1;
    let caution_len: number = ((body_Width / (ERROR ? ERROR.clientWidth : 1)) / 1.8) - 1;

    // Add warning and caution elements
    if (PAGE_NOT_FOUND && tape__center) {
      for (let i = 0; i < warning_len; i++) {
        tape__center.innerHTML += PAGE_NOT_FOUND.outerHTML;
      }
    }

    if (ERROR && tape__left) {
      for (let i = 0; i < caution_len; i++) {
        tape__left.innerHTML += ERROR.outerHTML;
      }
    }

    // Device orientation event listener
    window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => {
      if (tape__left && tape__center) {
        // Check if e.gamma is not null before using it
        const gamma = e.gamma !== null ? e.gamma : 0;  // Default to 0 if gamma is null
        const beta = e.beta !== null ? e.beta : 0;      // Default to 0 if beta is null
        tape__left.style.transform = `translate(${gamma / 3}px, ${beta / 3}px) rotateZ(-45deg)`;
        tape__center.style.transform = `translate(${gamma / 2}px, ${beta / 2}px) scale(1.5) rotateZ(5deg)`;
      }
    });

    // Mouse move event listener
    window.addEventListener("mousemove", (e: MouseEvent) => {
      if (tape__left && tape__center) {
        tape__left.style.transform = `translate(${e.pageX / 30}px, ${e.pageY / 30}px) rotateZ(-45deg)`;
        tape__center.style.transform = `translate(${e.pageX / 10}px, ${e.pageY / 10}px) scale(1.5) rotateZ(5deg)`;
      }
    });
  }
}

