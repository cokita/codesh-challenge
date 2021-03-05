import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast/toast.component';




@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    NgbModule
  ], 
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastComponent
  ]
})
export class SharedModule { }
