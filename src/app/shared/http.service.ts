import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OptionsHttp } from '../models/options-http.model';
import { LoginService } from '../external/login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    options?: OptionsHttp;

    constructor(protected http: HttpClient,
                protected router: Router) {
    }

    private setParamsOptions(object: any){
        if(!this.options){
            this.options = new OptionsHttp();
        }
        this.options.params = new HttpParams({
            fromObject: object
        });
    }

    private getOptions(newHeader?:any){
        let headers = new HttpHeaders({'Accept': 'application/json'});
        if(this.getToken()){
            headers = headers.set('Authorization', 'Bearer ' + this.getToken());
        }
        if(newHeader && newHeader instanceof Array){
            newHeader.forEach(obj => {
                if(obj) {
                    headers = headers.set(obj.header, obj.value);
                }
            });
        }else{
            headers = headers.set('Content-Type', 'application/json');
        }

        return this.options = { headers: headers, params: new HttpParams() };
    }

    public post(url:string, data:object, headers?:any): Observable<any> {
        url = environment.mock ? `${environment.endpoint_mock}/${url}` : `${environment.endpoint}/${url}`;
        return this.http
            .post(`${url}`, data, this.getOptions(headers));
    }

    public remove(url:string): Observable<any> {
        url = environment.mock ? `${environment.endpoint_mock}/${url}` : `${environment.endpoint}/${url}`; 
       this.getOptions();
        return this.http
            .delete(`${url}`, this.options);
    }

    public get(url:string, object?:object): Observable<any> {
        url = environment.mock ? `${environment.endpoint_mock}/${url}` : `${environment.endpoint}/${url}`;
        this.getOptions();
        if(object) {
            this.setParamsOptions(object);
        }

        return this.http
            .get(`${url}`, this.options);
    }

    public update(url:string, object:object, headers?:any): Observable<any> {
        url = environment.mock ? `${environment.endpoint_mock}/${url}` : `${environment.endpoint}/${url}`;
        this.getOptions(headers);

        return this.http
            .put(`${url}`, object, this.options);
    }

    public getToken(){
        const currentUser = localStorage.getItem('currentUser') || '';
        const all = currentUser ? JSON.parse(currentUser) : null;
        if ( all && all.access_token ) {
            return all.access_token;
        }
    }
}
