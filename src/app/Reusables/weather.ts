import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-forecast',
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
  
    <div *ngIf="weatherData" class="weather-info">
      <h3 class="location">
        <i class="fas fa-city"></i> {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h3>
      <div class="weather-detail">
        <i class="fas fa-thermometer-half"></i>
        <p class="temperature">Temperature: {{ weatherData.main.temp }}°C</p>
      </div>
      <div class="weather-detail">
        <i class="fas fa-tint"></i>
        <p class="humidity">Humidity: {{ weatherData.main.humidity }}%</p>
      </div>
    </div>
  
    <div *ngIf="!weatherData && city.trim()" class="no-data">
      <p>No weather data found for "{{ city }}".</p>
    </div>
  </div>
  `,
  
  styles: [`
  .weather-container {
    margin: 0 auto;
    background-color: #222b45;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: .0625rem solid #101426;
    max-width: 325px;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
  }
  
  
  .title {
    text-align: center;
    font-size: 2rem;
    color: #36b;
    margin-bottom: 20px;
  }
  
  .search {
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
  }
  
  .city-input {
    padding: 10px;
    flex: 1;
    background-color:rgba(16, 20, 38, 0.45);
    border: 1px solid #101426;
    border-radius: 5px;
    font-size: 1rem;
    color: #fff;
    outline: none;
    margin-right: 10px;
    transition: border 0.3s ease;
  }
  
  .city-input:focus {
    border-color: #101426;
  }
  
  .search-btn {
    padding: 10px 15px;
    background-color:rgba(16, 20, 38, 0.45);
    border: .0625rem solid #101426;
    color: white;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-btn:hover {
    background-color: #101426;
  }
  
  .weather-info {
    margin-top: 20px;
  }

  h3.location {
    text-align: center;
  }  

  .weather-detail {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
   }
  
  .weather-detail i {
    font-size: 1.8rem;
    margin-right: 15px;
    color: #36b;
  }
  
  .weather-info p {
    font-size: 1.1rem;
    margin: 10px 0;
    color: #555;
  }
  
  .weather-info .temperature {
    font-size: 1.3rem;
    font-weight: bold;
  }
  
  .no-data {
    text-align: center;
    color: #ff4747;
    font-size: 1.1rem;
    margin-top: 20px;
  }

  @media (max-width:786px) {
    .weather-container {
        padding: 5px;
    }
  }
  `]
  
})
export class WeatherForecastComponent implements OnInit {
    city: string = 'Ahmedabad'; // Default city set to Ahmedabad
    weatherData: any = null;
    apiKey: string = 'ebe4977f055defcccc75873566e531c1'; // Replace with your OpenWeather API key
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.getWeather(); // Fetch weather for Ahmedabad when the component loads
    }
  
    // Fetch weather data
    getWeather(): void {
      if (!this.city.trim()) return;
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.trim()}&appid=${this.apiKey}&units=metric`;
  
      this.http.get(url).subscribe({
        next: (data: any) => {
          this.weatherData = data;
        },
        error: (err) => {
          console.error('Error fetching weather data:', err);
          this.weatherData = null;
        }
      });
    }
  }
  
