import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private login: LoginService) {}

  ngOnInit(): void {
    setTimeout( () => {
      this.login.loggedIn = true;
      if (this.route.snapshot.params['param'] === undefined) {
        this.router.navigate([this.route.snapshot.params['path']]);
      }
      else {
        this.router.navigate([this.route.snapshot.params['path'], this.route.snapshot.params['param']]);
      }
    }, 5000 );
  }
}
