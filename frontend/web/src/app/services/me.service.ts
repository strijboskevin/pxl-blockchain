import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {InterceptorSkipHeader} from '../interceptors/AuthInterceptor';

@Injectable()
export class MeService {

  constructor(private http: HttpClient) {}

  getMe(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access')).set(InterceptorSkipHeader, '');
    return this.http.get('https://graph.microsoft.com/v1.0/me/', {headers: headers});
  }
}
