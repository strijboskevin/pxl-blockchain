import {Component, OnInit} from '@angular/core';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
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
