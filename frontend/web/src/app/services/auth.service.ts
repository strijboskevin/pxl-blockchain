import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Configs} from '../shared/configs';
import {MeService} from './me.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InterceptorSkipHeader} from '../interceptors/AuthInterceptor';
import {LoginService} from './login.service';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private meService: MeService,
              private http: HttpClient,
              private loginService: LoginService) {
  }

  login(code: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8').set(InterceptorSkipHeader, '');
    this.http.post(Configs.heroku + 'https://login.microsoftonline.com/common/oauth2/v2.0/token', 'grant_type=authorization_code&code=' + code + '&client_id=' + Configs.appId + '&redirect_uri=http://localhost:4200/redirect&' + 'client_secret=lkcqTNT730}zyoVLOX45)|;', {headers: headers}).subscribe(data => {
      localStorage.setItem('access', data['access_token']);
      localStorage.setItem('refresh', data['refresh_token']);
      this.meService.getMe().subscribe(me => {
        localStorage.setItem('username', me['mail']);
        localStorage.setItem('jobtitle', me['jobTitle']);
        console.log(me);
        this.loginService.loggedIn = true;
        this.router.navigate(['/home']);
      });
    });
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('jobtitle');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    this.router.navigate(['']);
  }
}
