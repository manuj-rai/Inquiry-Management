import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-weather',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="weather-container">
      <h2 class="title">Weather Forecast</h2>
    
      <div class="search">
        <input
          type="text"
          [(ngModel)]="city"
          placeholder="Enter city"
          class="city-input"
        />
        <button (click)="getWeather()" class="search-btn">Search</button>
      </div>
  
      <div *ngIf="loading" class="loading">Loading...</div>
    
      <div *ngIf="weatherData" class="weather-info">
        <div class="card">
          <div class="container">
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
  
          <div class="card-header">
            <span>{{ weatherData.name }}<br>{{ weatherData.sys.country }}</span>
            <span>{{ currentDate | date: 'MMMM d, yyyy' }}</span>
          </div>
  
          <span class="temp">{{ weatherData.main.temp }}°C</span>
  
          <div class="temp-scale">
            <span>Celcius</span>
          </div>
          
          <div class="additional-info">
            <p>Humidity: {{ weatherData.main.humidity }}%</p>
            <p>Wind: {{ weatherData.wind.speed }} m/s</p>
            <p>{{ weatherData.weather[0].description | titlecase }}</p>
          </div>
        </div>
      </div>
  
      <div *ngIf="error && city.trim()" class="no-data">
        <p>No weather data found for "{{ city }}". Please try another city.</p>
      </div>
    </div>
    `,
    styles: [`
      .weather-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #222b45;
        color: white;
        border-radius: 10px;
      }
  
      .title {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 20px;
      }
  
      .search {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
  
      .city-input {
        width: 70%;
        padding: 10px;
        font-size: 1rem;
        border: 2px solid #4c9beb;
        border-radius: 5px 0 0 5px;
        outline: none;
        background-color: #fff;
        color: #222;
      }
  
      .search-btn {
        padding: 10px 20px;
        font-size: 1rem;
        color: #fff;
        background-color: #4c9beb;
        border: 2px solid #4c9beb;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
  
      .search-btn:hover {
        background-color: #2a78b6;
        border-color: #2a78b6;
      }
  
      .loading {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        text-align: center;
        margin-top: 20px;
      }
  
      .weather-info {
        margin-top: 20px;
        text-align: center;
      }
  
      .additional-info {
        margin-top: 10px;
        font-size: 14px;
        color: rgba(87, 77, 51, 0.66);
      }
  
      .card {
        width: 100%;
        height: 235px;
        position: relative;
        padding: 25px;
        background: radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #222b45;
        box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
        border-radius: 23px;
        transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
        cursor: pointer;
      }
  
      .card:hover {
        transform: scale(1.05);
      }
  
      .container {
        width: 250px;
        height: 250px;
        position: absolute;
        right: -35px;
        top: -50px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(0.7);
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
      }
  
      .card-header span:first-child {
        word-break: break-all;
        font-weight: 800;
        font-size: 15px;
        line-height: 135%;
        color: rgba(87, 77, 51, 0.66);
      }
  
      .card-header span:last-child {
        font-weight: 700;
        font-size: 15px;
        line-height: 135%;
        color: rgba(87, 77, 51, 0.33);
      }
  
      .temp {
        position: absolute;
        left: 25px;
        bottom: 12px;
        font-weight: 700;
        font-size: 64px;
        line-height: 77px;
        color: rgba(87, 77, 51, 1);
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
        color: rgba(87, 77, 51, 0.66);
      }
    `]
  })
  
  export class WeatherForecastComponent implements OnInit {
      city: string = 'Ahmedabad'; // Default city set to Ahmedabad
      weatherData: any = null;
      error: boolean = false;
      loading: boolean = false;
      apiKey: string = 'ebe4977f055defcccc75873566e531c1'; // Replace with your OpenWeather API key
      currentDate: Date = new Date(); // Get the current date
    
      constructor(private http: HttpClient) {}
    
      ngOnInit(): void {
        this.getWeather(); // Fetch weather for Ahmedabad when the component loads
      }
    
      // Fetch weather data
      getWeather(): void {
        if (!this.city.trim()) return;
  
        this.loading = true;
        this.error = false; // Reset error flag before making request
    
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.trim()}&appid=${this.apiKey}&units=metric`;
    
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
          }
        });
      }
  }
  