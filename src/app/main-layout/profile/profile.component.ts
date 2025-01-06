import { Component } from '@angular/core';
import { ProfileComponent } from '../../admin/profile/profile.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class UserProfileComponent {

}
