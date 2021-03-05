import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./external/external.module').then(m => m.ExternalModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./internal/internal.module').then(m => m.InternalModule),
  },
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
