import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../shared/toast/toast.service';
import { Router } from '@angular/router';
import { LoginService } from '../external/login/login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toast: ToastService, private router: Router, private loginService:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    return next.handle(request).pipe(catchError(err => {
      this.toast.showDanger(err.error.message);
      if (err.status === 401) {
          if (this.router.url.indexOf('/login') === -1) {
              // auto logout if 401 response returned from api
              this.loginService.logout();
              location.reload(true);
          }
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
  }));
  }
}
