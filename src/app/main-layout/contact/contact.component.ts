import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InquiryService } from '../../services/inquiry.service';
import { MapsComponent } from "../../admin/maps/maps.component";




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone:true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MapsComponent]
})
export class ContactComponent implements OnInit {
  countries: string[] = []; 
  states: string[] = [];
  countryStateMap: { [key: string]: string[] } = {
    India: [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'],
  };

  selectedCountry: string = '';
  selectedState: string = '';

  constructor(
    private http: HttpClient,
    private inquiryService: InquiryService
  ) {}

  ngOnInit(): void {
    this.fetchCountries(); // Fetch countries when the component initializes
  }

  // Submit the form
  onSubmit(form: any): void {
    if (form.valid) {
      // Get the form data
      const formData = form.value;
      // Call the service to submit the data
      this.inquiryService.submitInquiry(formData).subscribe({
        next: (response) => {
          console.log('Inquiry submitted successfully', response);
          // Optionally, reset the form after successful submission
          alert('Inquiry submitted successfully!');
          form.reset();
        },
        error: (err) => {
          console.error('Error submitting inquiry:', err);
        }
      });
    }
  }

  // Fetch countries from REST Countries API
  fetchCountries(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe({
      next: (response) => {
        // Extract and sort country names
        this.countries = response
          .map((country) => country.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
      },
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

  onCountryChange(country: string): void {
    this.selectedCountry = country;
    this.states = this.countryStateMap[country] || [];
    this.selectedState = ''; // Reset state when country changes
  }
}
