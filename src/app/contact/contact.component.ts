import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone:true,
  imports:[FormsModule, CommonModule]
})
export class ContactComponent implements OnInit {
  countries: string[] = []; 
  states: string[] = [];
  countryStateMap: { [key: string]: string[] } = {
    India: [
    'Ahmedabad',
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCountries(); // Fetch countries when the component initializes
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

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      // You can also handle the form data here, like sending it to a server.
    } else {
      console.log('Form is invalid');
    }
  }
}
