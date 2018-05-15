import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configs} from '../shared/configs';
import {Observable} from 'rxjs/Observable';
import {InterceptorSkipHeader} from '../interceptors/AuthInterceptor';
import {MeService} from './me.service';

@Injectable()
export class TimerService {

  loaded: boolean;

  constructor(private http: HttpClient,
              private me: MeService) {
    this.loaded = true;
    if (localStorage.getItem('refresh') !== null) {
      let h = new HttpHeaders();
      h = h.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8').set(InterceptorSkipHeader, '');
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
        h = h.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8').set(InterceptorSkipHeader, '');
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
