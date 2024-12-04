import { Component } from '@angular/core';
import { AdminModule } from './admin.module';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
