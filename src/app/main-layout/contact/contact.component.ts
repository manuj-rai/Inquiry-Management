import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InquiryService } from '../../services/inquiry.service';
import { AlertService } from '../../services/alert.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone:true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class ContactComponent implements OnInit {
  countries: string[] = []; 
  states: string[] = [];
  genderOptions: any[] = [];
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
  countriesFetched: boolean = false;

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private inquiryService: InquiryService
  ) {}

  ngOnInit(): void {
    this.fetchGenderOptions();
  }

  onSubmit(form: any): void {
    if (form.valid) {
      // Get the form data
      const formData = form.value;
  
      // Call the service to submit the data
      this.inquiryService.submitInquiry(formData).subscribe({
        next: (response) => {
          // Check the status code or response header for success or error
          if (response && response.header?.statusCode === 100) {
            console.log('Inquiry submitted successfully', response);
            this.alertService.success('Inquiry submitted successfully!');
            form.reset(); // Reset the form after successful submission
          } else {
            console.error('Error in response:', response);
            this.alertService.error(response.header?.desc || 'Failed to submit the inquiry. Please try again.');
          }
        },
        error: (err) => {
          // Handle HTTP or network errors
          console.error('Error submitting inquiry', err);
          this.alertService.error('An error occurred while submitting the inquiry. Please try again.');
        },
      });
    } else {
      this.alertService.error('Please fill out the form correctly before submitting.');
    }
  }
  
  

  // Fetch countries from REST Countries API
  fetchCountries(): void {
    if (this.countriesFetched) return; // Skip fetching if countries are already loaded

    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe({
      next: (response) => {
        this.countries = response
          .map((country) => country.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
        this.countriesFetched = true; // Mark as fetched
      },
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

  onCountryChange(country: string): void {
    this.selectedCountry = country;
    this.states = this.countryStateMap[country] || [];
    this.selectedState = ''; // Reset state when country changes
  }

  fetchGenderOptions(): void {
    this.inquiryService.getGender().subscribe(
      (response) => {
        if (response.header.statusCode === 100) {
          this.genderOptions = response.data;
        } else {
          console.error('Error:', response.Header.Desc);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
}
