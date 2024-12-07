import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';


@NgModule({
  declarations: [],
  imports: [
    AdminNavbarComponent,
    AdminSidebarComponent,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
