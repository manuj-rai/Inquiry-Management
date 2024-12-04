import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
      { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },

    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];
