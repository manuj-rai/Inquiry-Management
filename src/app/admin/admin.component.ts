import { Component } from '@angular/core';
import { AdminModule } from './admin.module';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AdminFooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminModule,
    AdminNavbarComponent,
    AdminSidebarComponent,
    RouterOutlet, 
    AdminFooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  isSidebarVisible = false;

  onSidebarToggle() {
    this.isSidebarVisible = !this.isSidebarVisible; // Toggle sidebar visibility
  }
}
