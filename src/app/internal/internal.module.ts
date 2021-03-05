import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { InternalRoutingModule } from './internal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { PatientsComponent } from './patients/patients.component';


@NgModule({
  declarations: [HomeComponent, LayoutComponent, PatientsComponent],
  imports: [
    CommonModule,
    SharedModule,
    InternalRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_key,
      libraries: ['places']
    })
  ]
})
export class InternalModule { }
