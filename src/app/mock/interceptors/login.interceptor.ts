import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/external/login/login.service';

const ResponseLogin = {
  access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMTRhNWNiYWU4MDhhYWZmMDIxOGFhNGRmZjIzNDVjYzNlOTg4MDA1NWJhZjE1ODNmNWNkMjU2YjU4ODFhMzU1ZTJmOTYyZGE3NWI5NmM2Y2UiLCJpYXQiOjE2MTM1ODg0NjUsIm5iZiI6MTYxMzU4ODQ2NSwiZXhwIjoxNjEzNzYxMjY0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ZiWItHLSrPQ9Rprcrte-UhEeAC0UYf8yGO1tF-HHmEjiiQYGoYgPXDDvX39XgPbkfW1YlK_ieGBUC_KGNpKF8YGoAUef4rTJsnTTDeRWXOx1FcrJ-BdHMVsiiq9FZURPBMSNPbCig6fT5Jspbg4-RgTcMVpYwjRJNGRa-WAeBD1pfRuNcrxesQTtRkC3AwI8WKyQ6MUN-_f4i33Ys8mQCkdSs72L8TQStYNwUWi7buo8fokcJL0cAxzz4u91bjDn_kHclGdbFLi6ylBPW93_1tNy8s2MiRr6dzN1_rdfMFNiQHmJwKt3iQ8BdzPVjepnmyPZC2aBsNIi1oox-Bj6D-qMXpzPLpJj_z79zbVnPz4y9hwDj2lrJ9_R9gygjFJ28OF-2CGPymC7xJuaavvSkeUi27aj3uCb0_GuURu1lqgq94XYYCDlubc2pYSk9K1F_x1SN3M10T2WAt9CMEiZOcgk6rv3E-tIBcPuY0Knm0f1tUlbKsPV3jddWwRgwqtZzbRpfv_tNMkRRfOtglN6DLSdAeX8hf1jnziJlLVS7NsFsncS--55aF0Xb_NV9lVUyL0cc514j1citaoTe-BEWArEm1CJmW9n7Y6Te9_IqeSvzCdcL5zNhh4ipoltRI3_wvdg4eDvYSoMCRIGQPoHtZ9lf0FdLBzCImqUNrK7Jyc",
  expires_in: 172799,
  refresh_token: "def5020033a983132aa2582783116f8d86a5335617114e19b9c7648d18a06e9068845bebe3dc04c44646398ab23b723fcb9af1a88311cbdd7b7519af191055e513b220f9b92b58a440ed446820eacdeea3e0c4094cbe75c90196af52bc0f2a534cf1ab8a8a1bcfda2cf7cb513507665159860a06b0441e1fcb7b7df3043c6ea159c93e1f0964312a4b6b891e1613c65b1d6cc157d2c54a33e8b1a21909d91e11ddb03bda0852aa7983b1a1677891f429a264424ff6bb66538d4b52764f7849c64de8f32dab1ef20d74bfdb2eca50653d4540280639347dfd79a043638f0d8ccd2bcec82908cc806d34b58017ce89f032a9c908b0634e59d45b65bf333fc598bebb86334c486d0b4f85fbd107a4cac8752cb6c66a5d9d4dadeb535d258bd7e10fbf998a67de7a150e3ad84efb6ee3b7fa5245034ed9946ef06774d9660cd4fe2933d2aceeb2275d34c1b24323208ef9ce466ae75b6fd9719cd5e09ae756e206856d",
  token_type: "Bearer"
}

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService, private login: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(environment.mock && request.method === "POST" && request.url === `${environment.endpoint_mock}/login`) {
      const body = Object.assign({password: null, user: null}, request.body);
      if(body && body.password == '123456' && body.user == 'codesh') {
        return of(new HttpResponse({ status: 200, body: ResponseLogin }));
      }else{
        this.toastService.showDanger("Usuário ou senha inválidos");
        this.login.logout();
        return of(new HttpResponse({ status: 401, body: {} }));
      }
    }
    return next.handle(request)
  }
}
