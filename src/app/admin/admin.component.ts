import { Component } from '@angular/core';
import { AdminModule } from './admin.module';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';




@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminModule,
     AdminNavbarComponent, AdminSidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  isSidebarVisible = false;

  onSidebarToggle() {
    this.isSidebarVisible = !this.isSidebarVisible; // Toggle sidebar visibility
  }
}
