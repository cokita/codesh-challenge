import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherModel } from 'src/app/models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(protected http: HttpClient) { }

  getWeather(city?: string, state?: string, country?: string): Observable<WeatherModel> {
    let search = '';
    if(city && state && country) {
      search = `${city},${state},${country}`;
    } else if(state && country) {
      search = `${state},${country}`;
    } else if(country){
      search = `${country}`;
    } 
    // http://api.openweathermap.org/data/2.5/weather?q=Sobradinho,Distrito%20Federal,%20BR&lang=pt_br&units=metric&appid=f68a1d71bc110d0936d8851f49ad6cef
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&lang=pt_br&appid=${environment.openwheather}`)
      .pipe(
        map((response:any) => response)
      );
  }
}
