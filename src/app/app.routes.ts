import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  { path: 'error', component: ErrorPageComponent },

  /*Main Layout*/
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./main-layout/home/home.component').then(m => m.HomeComponent) },
      { path: 'news', loadComponent: () => import('./main-layout/news/news.component').then(m => m.NewsComponent) },
      { path: 'news-details', loadComponent: () =>  import('./main-layout/news/detailed-news/detailed-news.component').then(m => m.DetailedNewsComponent)},
      { path: 'news/category/:tagName', loadComponent: () => import('./main-layout/news/news.component').then(m => m.NewsComponent) },
      { path: 'contact', loadComponent: () => import('./main-layout/contact/contact.component').then(m => m.ContactComponent) },
      { path: 'about', loadComponent: () => import('./main-layout/about/about.component').then(m => m.AboutComponent) },
      { path: 'login', loadComponent: () => import('./main-layout/login/login.component').then(m => m.LoginComponent) },
      { 
        path: 'profile', 
        loadComponent: () => import('./main-layout/profile/profile.component').then(m => m.UserProfileComponent), 
        canActivate: [AuthGuard]
      },    
    ]
  },

  /*Admin Layout*/
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 21 },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent ) },
      { path: 'profile', loadComponent: () => import('./admin/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'news', loadComponent: () => import('./admin/news/news.component').then(m => m.NewsComponent) },
      { path: 'maps', loadComponent: () => import('./admin/maps/maps.component').then(m => m.MapsComponent) },

    ]
  },

];
