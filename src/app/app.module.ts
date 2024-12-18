import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContactComponent } from './main-layout/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './main-layout/shared/navbar/navbar.component';
import { LoginComponent } from './main-layout/login/login.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



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
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [],  
  bootstrap: [],  
})

export class AppModule {}