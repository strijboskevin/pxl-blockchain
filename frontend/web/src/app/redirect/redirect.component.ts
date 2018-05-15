import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-redirect',
  template: '<p class="lead">Redirecting...</p>',
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      this.auth.login(code);
    });
  }
}
