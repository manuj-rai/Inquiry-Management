import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component'; // Import ContactComponent

const routes: Routes = [
  { path: 'contact', component: ContactComponent }, // Define route for ContactComponent
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Optional: Redirect to home if no route is found
  { path: '**', redirectTo: '/home' }, // Optional: Redirect unknown routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

