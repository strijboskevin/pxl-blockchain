﻿/*
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
*  See LICENSE in the source repository root for complete license information.
*/

import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {MeService} from '../services/me.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import {tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {TimerService} from '../services/timer.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AssignmentService]
})
export class HomeComponent implements OnInit {
  assignments: Observable<Assignment[]>;

  constructor(private assignmentService: AssignmentService,
              private router: Router,
              public nav: NavbarService,
              private login: LoginService) {
  }

  ngOnInit() {
    this.nav.show();
    this.nav.element = 'home';

    if (this.login.loggedIn) {
      if (localStorage.getItem('username') !== null) {
        this.assignments = this.assignmentService.getOpenAssignments(localStorage.getItem('username'));
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['loading', 'home']);
    }
  }
}
