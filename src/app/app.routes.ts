import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [

  /*Main Layout*/
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
      { path: 'news', loadComponent: () => import('./news/news.component').then(m => m.NewsComponent) },
      { path: 'news/category/:tagName', loadComponent: () => import('./news/news.component').then(m => m.NewsComponent) },
      { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
      { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    ]
  },

  /*Admin Layout*/
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    ]
  },

];
