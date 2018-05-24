import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {LoginService} from '../services/login.service';
import {LogsService} from '../services/logs.service';
import {Log} from '../models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
})
export class LogsComponent implements OnInit {
  logs: Log[] = []
  final: Log[] = [];
  start: string;
  end: string;
  search: string;

  constructor(private logsService: LogsService,
              private router: Router,
              public nav: NavbarService,
              private login: LoginService) {
  }

  ngOnInit() {
    this.nav.show();
    this.nav.element = 'logs';

    if (!this.login.loggedIn) {
      this.router.navigate(['loading', 'logs']);
    } else if (!localStorage.getItem('jobtitle').includes('Personeel')) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.logs = [];
    this.final = [];
    this.logsService.getBween(new Date(this.start).getTime(), new Date(this.end).getTime()).subscribe(data => {
        this.logs = data;
      },
      err => {
        console.log(err);
      },
      () => {
        this.performSearch();
      });
  }

  performSearch() {
    let x;

    for (x = 0; x < this.logs.length; x++) {
      if (this.logs[x].log.indexOf(this.search) > -1) {
        this.final.push(this.logs[x]);
      }
    }
  }
}
