import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';





@NgModule({
  declarations: [
      
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    ReactiveFormsModule
  ],
  providers: [],  
  bootstrap: [],  
})

export class AppModule {}