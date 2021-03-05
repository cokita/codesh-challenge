import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpService, private router: Router) { }

  login(user: string, password: string){
    return this.httpService.post(`login`, {user: user, password: password});
  }

  public getCurrentUser() {
    return localStorage.getItem('currentUser') || '';
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
