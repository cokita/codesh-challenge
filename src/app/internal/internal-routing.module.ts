import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from "./user.guard";
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';


const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'patients', component: PatientsComponent },
      ],
      canActivate: [UserGuard],
    },
    { path: '**', redirectTo: '/admin/home' }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InternalRoutingModule { }