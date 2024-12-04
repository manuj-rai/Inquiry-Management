import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
      
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    NavbarComponent,
    ContactComponent,
    LoginComponent,
    ReactiveFormsModule
  ],
  providers: [],  
  bootstrap: [],  
})

export class AppModule {}