import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddressModel } from 'src/app/models/address.model';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  addressForm: FormGroup;
  submitted: boolean = false;

  validateFormControl = new FormControl('', [
    Validators.required
  ]);

  latitude: any = 51.673858;;
  longitude: any = 7.815982;
  zoom: number = 8;
  address: AddressModel= new AddressModel;
 

  constructor(private locationService: LocationService, private formBuilder: FormBuilder, private toastService: ToastService) {
    this.addressForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  get f() { return this.addressForm.controls; }

  ngOnInit(): void {
    this.setCurrentLocation();
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.permissions.query({name:'geolocation'}).then((result) => {
        if(result.state == 'granted') {
          navigator.geolocation.getCurrentPosition((position:any) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 15;
            this.getAddress();
          });
        } else if(result.state == 'denied') {
          this.toastService.showDanger("Não foi possível recuperar a sua localização, certifique-se que o sistema tem permissões para recuperar tais informações.")
        }
      });      
    } else {
      this.toastService.showDanger("Não foi possível recuperar a sua localização, seu browser não é compatível.")
    }
  }

  private getAddress() {
    if (this.latitude && this.longitude) {
      this.locationService.getAddressByCoordinates(this.latitude, this.longitude).subscribe(response => {
         this.address = response;
         this.formatSearch();
      });
    }
  }

  searchAddress() {
    this.locationService.getAddressByString(this.f.search.value).subscribe(response => {
       this.address = response;
       this.latitude = this.address.geometry.location.lat;
       this.longitude = this.address.geometry.location.lng;
    });
  }

  formatSearch() {
    let formatted = this.address.route+ ', '+ this.address.political.map((pol:any) => pol.long_name).join(", ");
    this.addressForm.patchValue({search: formatted});
  }
}
