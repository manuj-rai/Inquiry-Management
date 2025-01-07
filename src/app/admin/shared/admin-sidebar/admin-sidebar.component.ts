import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
  standalone:true,
  imports:[CommonModule]
})
export class AdminSidebarComponent implements OnInit {
  @Input() isSidebarVisible: boolean = true;
  activeMenu: string = ''; // Default active menu

  constructor(private router: Router) {}

  ngOnInit() {
    // Initial setup for activeMenu based on the current route
    const currentRoute = this.router.url.split('/')[2]?.toLowerCase(); // get the part of the URL after '/admin'
    this.activeMenu = currentRoute || 'dashboard'; // Default to 'dashboard' if no route is found
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu.toLowerCase(); // Ensure menu names are lowercase for consistency

    // Navigate to the selected menu route
    if (menu === 'dashboard') {
      this.router.navigate(['admin/dashboard']);
    } else if (menu === 'profile') {
      this.router.navigate(['admin/profile']);
    } else if (menu === 'news') {
      this.router.navigate(['admin/news']);
    } else if (menu === 'tables') {
      this.router.navigate(['admin/tables']);
    } else if (menu === 'maps') {
      this.router.navigate(['admin/maps']);
    } else if (menu === 'pages') {
      this.router.navigate(['admin/pages']);
    } else if (menu === 'logout') {
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('user'); 
      window.location.reload(); 
    }
  }
}
