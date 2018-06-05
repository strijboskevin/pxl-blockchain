import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configs} from '../shared/configs';
import {Observable} from 'rxjs/Observable';
import {InterceptorSkipHeader} from '../interceptors/AuthInterceptor';

@Injectable()
export class TimerService {
  /*
  Start a time which will call the Microsoft Graph API for a new access token every 45mins.
  It starts with a call to Graph to enhance the performance when accessing the application with a direct link.
   */
  constructor(private http: HttpClient) {
    if (localStorage.getItem('refresh') !== null) {
      let h = new HttpHeaders();
      h = h.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8').set(InterceptorSkipHeader, ''); // Do not send a bearer token
      this.http.post(Configs.heroku + 'https://login.microsoftonline.com/common/oauth2/v2.0/token', 'grant_type=refresh_token'
        + '&refresh_token=' + localStorage.getItem('refresh')
        + '&client_id=' + Configs.appId
        + '&redirect_uri=http://localhost:4200/redirect&'
        + 'client_secret=lkcqTNT730}zyoVLOX45)|;',
        {headers: h}).subscribe(
        d => {
          localStorage.setItem('access', d['access_token']);
          localStorage.setItem('refresh', d['refresh_token']);
        });
    }

    Observable.interval(1000 * 60 * 45).subscribe(x => {
      if (localStorage.getItem('refresh') !== null) {
        let h = new HttpHeaders();
        h = h.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8').set(InterceptorSkipHeader, ''); // Do not send a bearer token
        this.http.post(Configs.heroku + 'https://login.microsoftonline.com/common/oauth2/v2.0/token', 'grant_type=refresh_token'
          + '&refresh_token=' + localStorage.getItem('refresh')
          + '&client_id=' + Configs.appId
          + '&redirect_uri=http://localhost:4200/redirect&'
          + 'client_secret=lkcqTNT730}zyoVLOX45)|;',
          {headers: h}).subscribe(
          d => {
            localStorage.setItem('access', d['access_token']);
            localStorage.setItem('refresh', d['refresh_token']);
          });
      }
    });
  }
}
