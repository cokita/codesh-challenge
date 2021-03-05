import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressModel } from 'src/app/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(protected http: HttpClient) { }

  getAddressByCoordinates(latitude: number, longitude: number): Observable<AddressModel> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${environment.google_key}`)
      .pipe(
        map(response => this.formatAddress(response))
      );

    //http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
    // return this.http.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=10&appid=${environment.openwheather}`)
    //   .pipe(
    //     map(response => response)
    //   );
  }

  getAddressByString(search: string): Observable<AddressModel> {
    // https://maps.googleapis.com/maps/api/geocode/json?address=Quadra%2013%20Conjunto%20F,%2038&key=
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${environment.google_key}`)
      .pipe(
        map(response => this.formatAddress(response))
      );
  }


  formatAddress(response:any): AddressModel {
    let address:AddressModel = new AddressModel;
    const components = response.results[0].address_components;
    address.street_number = components.filter((element: any) => element.types.includes('street_number')).length > 0 ?
                                    components.filter((element: any) => element.types.includes('street_number'))[0].long_name : '';
    address.route = components.filter((element: any) => element.types.includes('route')).length > 0 ?
                                    components.filter((element: any) => element.types.includes('route'))[0].long_name : '';
    address.political = components.filter((element: any) => element.types.includes('political'));
    address.country = components.filter((element: any) => element.types.includes('country')).length > 0 ? 
                                    components.filter((element: any) => element.types.includes('country'))[0].short_name : '';
    address.state = components.filter((element: any) => element.types.includes('administrative_area_level_1')).length > 0 ? 
                                    components.filter((element: any) => element.types.includes('administrative_area_level_1'))[0].short_name : '';

    let city = components.filter((element: any) => element.types.includes('locality')).length > 0 ? 
                      components.filter((element: any) => element.types.includes('locality'))[0].long_name : null;
    if(!city) {
      city = components.filter((element: any) => element.types.includes('administrative_area_level_2')).length > 0 ? 
                                    components.filter((element: any) => element.types.includes('administrative_area_level_2'))[0].long_name : '';                                
    }

    address.city = city;
    address.formatted_address = response.results[0].formatted_address;
    address.geometry = response.results[0].geometry;
    address.results = response.results;
    return address;
  }
}
