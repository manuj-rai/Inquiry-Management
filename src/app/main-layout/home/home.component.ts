import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
AlertService

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private alertServic : AlertService
  ){}

  alert() {
  this.alertServic.warning("Currently unavailable. Please check back later.")
  }
}
