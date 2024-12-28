import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-weather',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
      <div class="card">
      <h2 class="title">Weather Forecast</h2>
      <div *ngIf="error" class="error-message">
          <p>{{ errorMessage }}</p>
          <!-- Show manual city input when location access is denied or unavailable -->
          <div *ngIf="!latitude && !longitude">
            <input
              type="text"
              [(ngModel)]="manualCityInput"
              (keyup.enter)="getWeatherByCity(manualCityInput)"
              placeholder="Enter city name"
              class="form-control"
            />
          </div> 
        </div>
        <!-- Weather Data Display -->
        <div *ngIf="weatherData">
          <div class="card-header">
            <span>{{ weatherData.name }}, {{ weatherData.sys.country }}</span>
            <span>{{ currentDate | date: 'short' }}</span>
          </div>
          <span class="temp">{{ weatherData.main.temp }}°C</span>
          <div class="temp-scale">
            <span>Celsius</span>
          </div>
        </div>
      <div class="container">
        <!-- Loading message -->
        <div *ngIf="loading">
          <p>Loading weather data...</p>
        </div>



        <div class="cloud front">
          <span class="left-front"></span>
          <span class="right-front"></span>
        </div>
        <span class="sun sunshine"></span>
        <span class="sun"></span>
        <div class="cloud back">
          <span class="left-back"></span>
          <span class="right-back"></span>
        </div>
      </div>
    </div>
  `,
    styles: [`
      .card {
        height: 235px;
        position: relative;
        padding: 25px;
        background: radial-gradient(178.94% 106.41% at 26.42% 106.41%, #222b45 0%, rgba(255, 255, 255, 0) 71.88%), #222b45;
        box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 
                    0px 87px 52px rgba(0, 0, 0, 0.05), 
                    0px 39px 39px rgba(0, 0, 0, 0.09), 
                    0px 10px 21px rgba(0, 0, 0, 0.1), 
                    0px 0px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        border: .0625rem solid #101426;
        transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
      }

      p {
        max-width: 250px;
      }
      
      .container {
        width: 250px;
        height: 250px;
        position: absolute;
        right: -28px;
        top: -50px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(0.7);
      }

      .title {
        font-size: 1.2rem;
        color: #36b;
        margin-top: 0;
        margin-bottom: 30px;
      }

      .error-message {
        color: red;
        font-weight: bold;
      }

      input.form-control {
        width: 95%;
        padding: 10px;
        flex: 1;
        background-color:rgba(16, 20, 38, 0.45);
        border: 1px solid #101426;
        border-radius: 4px;
        font-size: 1rem;
        color: #fff;
        outline: none;
        margin-right: 10px;
        margin-top: 45px;
        transition: 0.3s ease-in-out;
      }

      input.form-control:hover {
        background-color: #101426;
      }
      
      .cloud {
        width: 250px;
      }
      
      .front {
        padding-top: 45px;
        margin-left: 25px;
        display: inline;
        position: absolute;
        z-index: 11;
        animation: clouds 8s infinite;
        animation-timing-function: ease-in-out;
      }
      
      .back {
        margin-top: -30px;
        margin-left: 150px;
        z-index: 12;
        animation: clouds 12s infinite;
        animation-timing-function: ease-in-out;
      }
      
      .right-front {
        width: 45px;
        height: 45px;
        border-radius: 50% 50% 50% 0%;
        background-color: #4c9beb;
        display: inline-block;
        margin-left: -25px;
        z-index: 5;
      }
      
      .left-front {
        width: 65px;
        height: 65px;
        border-radius: 50% 50% 0% 50%;
        background-color: #4c9beb;
        display: inline-block;
        z-index: 5;
      }
      
      .right-back {
        width: 50px;
        height: 50px;
        border-radius: 50% 50% 50% 0%;
        background-color: #4c9beb;
        display: inline-block;
        margin-left: -20px;
        z-index: 5;
      }
      
      .left-back {
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 0% 50%;
        background-color: #4c9beb;
        display: inline-block;
        z-index: 5;
      }
      
      .sun {
        width: 120px;
        height: 120px;
        background: -webkit-linear-gradient(to right, #fcbb04, #fffc00);
        background: linear-gradient(to right, #fcbb04, #fffc00);
        border-radius: 60px;
        display: inline;
        position: absolute;
      }
      
      .sunshine {
        animation: sunshines 2s infinite;
      }
      
      @keyframes sunshines {
        0% {
          transform: scale(1);
          opacity: 0.6;
        }
      
        100% {
          transform: scale(1.4);
          opacity: 0;
        }
      }
      
      @keyframes clouds {
        0% {
          transform: translateX(15px);
        }
      
        50% {
          transform: translateX(0px);
        }
      
        100% {
          transform: translateX(15px);
        }
      }
      
      .card-header {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 250px;
      }
      
      .card-header span:first-child {
        word-break: break-all;
        font-weight: 800;
        font-size: 15px;
        line-height: 135%;
        color: #fff;
      }
      
      .card-header span:last-child {
        font-weight: 700;
        font-size: 15px;
        line-height: 135%;
        color: #fff;
      }
      
      .temp {
        position: absolute;
        left: 25px;
        bottom: 12px;
        font-weight: 700;
        font-size: 64px;
        line-height: 77px;
        color: #fff;
      }
      
      .temp-scale {
        width: 80px;
        height: 36px;
        position: absolute;
        right: 25px;
        bottom: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.06);
        border-radius: 9px;
      }
      
      .temp-scale span {
        font-weight: 700;
        font-size: 13px;
        line-height: 134.49%;
        color: #fff;
      }
      .front {
        margin: 0;
      }
      `]
  })
  
  export class WeatherAppComponent implements OnInit {
    city: string = '';  // Empty for now, as we're using the user's location
    weatherData: any = null;
    error: boolean = false;
    loading: boolean = false;
    apiKey: string = 'ebe4977f055defcccc75873566e531c1';
    currentDate: Date = new Date();
    latitude: number | null = null;
    longitude: number | null = null;
    errorMessage: string = '';
    manualCityInput: string = '';  // For manual city input
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.getCurrentLocation();  // Get the user's current location
    }
  
    // Get current location using the Geolocation API
    getCurrentLocation(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.getWeatherByLocation();  // Fetch weather for the user's current location
          },
          (error) => {
            console.error('Error getting location:', error);
            this.error = true;
  
            // Handle specific geolocation errors and set error messages
            if (error.code === error.PERMISSION_DENIED) {
              this.errorMessage = 'Location access was denied. Please enable location access to get weather information, or enter city manually.';
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              this.errorMessage = 'Location information is unavailable. Please try again later.';
            } else if (error.code === error.TIMEOUT) {
              this.errorMessage = 'The request to get your location timed out. Please try again.';
            } else {
              this.errorMessage = 'An error occurred while retrieving your location.';
            }
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        this.error = true;
        this.errorMessage = 'Geolocation is not supported by this browser. Please enable location services or enter the city manually.';
      }
    }
  
    // Fetch weather data using latitude and longitude
    getWeatherByLocation(): void {
      if (this.latitude === null || this.longitude === null) return;
  
      this.loading = true;
      this.error = false;
  
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=metric`;
  
      this.http.get(url).subscribe({
        next: (data: any) => {
          this.weatherData = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching weather data:', err);
          this.weatherData = null;
          this.error = true;
          this.loading = false;
          this.errorMessage = 'Failed to fetch weather data. Please try again later.';
        }
      });
    }
  
    // Fetch weather data based on manual city input
    getWeatherByCity(city: string): void {
      if (!city) return;
  
      this.loading = true;
      this.error = false;
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
  
      this.http.get(url).subscribe({
        next: (data: any) => {
          this.weatherData = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching weather data:', err);
          this.weatherData = null;
          this.error = true;
          this.loading = false;
          this.errorMessage = 'Could not fetch weather data for the entered city. Please try again.';
        }
      });
    }
  
    // Handle manual city input change
    onCityInputChange(): void {
      if (this.manualCityInput) {
        this.getWeatherByCity(this.manualCityInput);
      }
    }
  }