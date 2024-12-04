import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    ContactComponent
  ], 
  imports: [
    BrowserModule,
    AppComponent,
    ContactComponent,
    AppRoutingModule
  ],
  providers: [],  
  bootstrap: [],  
})
export class AppModule {}