import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, delay, catchError, tap } from 'rxjs/operators';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  count = 0;
  constructor(private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.params.has('noSpinner')) {
      this.spinner.show();
      this.count++;
      return next.handle(request)

            .pipe ( tap (

                    //event => console.log(event),

                    //error => console.log( error )

                ), finalize(() => {

                    this.count--;

                    if ( this.count == 0 ) this.spinner.hide ()
                })
            );
    } else {
      return next.handle(request);
    }
  }
}
