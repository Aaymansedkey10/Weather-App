import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClient],
})
export class AppComponent implements OnInit {
  apiKey: string = '4b1c74254d5d4cb1b6273023241806';
  baseUrl: string = 'https://api.weatherapi.com/v1/forecast.json';
  days: string[] = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];
  dayIndex: number = 1;
  currentDay: string = '';
  nextDay: string = '';

  searchValue: string = 'cairo';
  country: string = '';

  currentConditionText: string = '';
  currentConditionIcon: string = '';
  currentTemp_c: number = 0;
  currentWind_dir: string = '';
  currentVis_Km: number = 0;
  currentWind_kph: number = 0;
  currentIsDay: number = 0;

  forecastDate: string = '';
  forecastMaxTemp_c: number = 0;
  forecastMaxWind_kph: number = 0;
  forecastMinTemp_c: number = 0;
  forecastDayTemp_c: number = 0;
  forecastDayAvgVis_Miles: number = 0;
  forecastDayAvgVis_Km: number = 0;
  forecastConditionText: string = '';
  forecastConditionIcon: string = '';

  allData: any[] = [];
  globalLocation: any;
  globalCurrent: any;
  globalForecast: any;
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.getWeather();
    this.selectDayAutomatic(this.dayIndex);
  }
  // this function is applied when click in button
  weather() {
    this.getWeather();
  }
  // this function to clear the input
  clear() {
    this.searchValue = ' ';
  }
  // this function to get the data
  async getWeather() {
    let url = `${this.baseUrl}?key=${this.apiKey}&q=${this.searchValue}`;
    let response = [await this.httpClient.get(url).toPromise()];
    if (response) {
      this.allData = response;
    }
    for (let item of this.allData) {
      this.globalLocation = item['location'];
      this.globalCurrent = item['current'];
      this.globalForecast = item['forecast'];
    }
    this.country = this.globalLocation['name']; // select the country name
    // this.localTime = this.globalLocation['localtime']; // select the local time

    this.currentConditionText = this.globalCurrent['condition']['text']; // select the current condition text
    this.currentConditionIcon = this.globalCurrent['condition']['icon']; // select the current condition icon
    this.currentTemp_c = this.globalCurrent['temp_c']; // select the current temp_c
    this.currentWind_dir = this.globalCurrent['wind_dir']; // select the current wind_dir
    this.currentVis_Km = this.globalCurrent['vis_km']; // select the current vis_km
    this.currentWind_kph = this.globalCurrent['wind_kph']; // select the wind_kph

    this.forecastDate = this.globalForecast['forecastday'][0]['date']; // select date
    this.forecastMaxTemp_c =
      this.globalForecast['forecastday'][0]['day']['maxtemp_c']; // select forecast max temp_c
    this.forecastMaxWind_kph =
      this.globalForecast['forecastday'][0]['day']['maxwind_kph']; // select forecast max wind_kph
    this.forecastMinTemp_c =
      this.globalForecast['forecastday'][0]['day']['mintemp_c']; // select forecast min temp_c
    this.forecastDayTemp_c =
      this.globalForecast['forecastday'][0]['day']['avgtemp_c']; // select forecast day temp_c
    this.forecastDayAvgVis_Km =
      this.globalForecast['forecastday'][0]['day']['avvis_km']; // select forecast day avgvis_km
    this.forecastDayAvgVis_Miles =
      this.globalForecast['forecastday'][0]['day']['avvis_miles']; // select forecast day avvis_miles
    this.forecastConditionText =
      this.globalForecast['forecastday'][0]['day']['condition']['text']; // select forecast condition text
    this.forecastConditionIcon =
      this.globalForecast['forecastday'][0]['day']['condition']['icon']; // select forecast condition icon
  }

  // select the day 
  selectDayAutomatic(daynum: number) {
    this.currentDay = this.days[daynum];
    this.nextDay = this.days[daynum + 1];
  }
}
