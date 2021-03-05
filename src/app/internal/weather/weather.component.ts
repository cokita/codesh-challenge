import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherModel } from 'src/app/models/weather.model';
import { WeatherService } from './weather.service';
import { AddressModel } from 'src/app/models/address.model';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnChanges {
  @Input() address: AddressModel = new AddressModel;
  weather: WeatherModel = new WeatherModel;
  constructor(private weatherService: WeatherService, private toastService:ToastService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.address = changes.address.currentValue;
    this.getWeather();
}

  getWeather() {
    if(this.address.city || this.address.state || this.address.country) {
      this.weatherService.getWeather(this.address.city, this.address.state, this.address.country).subscribe(resp => {
        this.weather = resp;
      }, (error:any) => {
        this.weather = new WeatherModel;
      })
    }
  }
}
