import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule,
    AdminNavbarComponent,
    AdminSidebarComponent,
    DashboardComponent,
    ProfileComponent,
    RouterOutlet,
  ]
})
export class AdminModule { }
