import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Route, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  height: Number;
  width: Number;

  constructor(private authService: AuthService,
              private router: Router) {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  private onLogin() {
    if (localStorage.getItem('username') === null) {
      window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=e6c987d2-8bdc-4f1a-bafc-04ba3d51f340&response_type=code&redirect_uri=http://localhost:4200/redirect&response_mode=query&scope=User.Read offline_access&state=';
    } else {
      this.router.navigate(['/home']);
    }
  }
}
