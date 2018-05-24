import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {Request} from '../models/Request';
import {MeService} from '../services/me.service';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {TimerService} from '../services/timer.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  providers: [AssignmentService]
})
export class NewrequestComponent implements OnInit {
  assignments: Assignment[] = [];
  requests: Request[] = [];
  amountOfRequests: Number[] = [];
  amountOfAssignees: Number[] = [];
  ready = false;
  found: boolean;
  username: string;

  constructor(private meService: MeService,
              private authService: AuthService,
              private assignmentService: AssignmentService,
              private router: Router,
              public nav: NavbarService,
              private login: LoginService) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.nav.show();
    this.nav.element = 'newrequests';
    if (localStorage.getItem('username') !== null) {
      if (this.login.loggedIn) {
        this.assignmentService.getAssignmentsByLecturer(localStorage.getItem('username')).subscribe(data => {
          const dummy = data;

          dummy.forEach(item => {
            this.assignments.push(new Assignment(item.name, item.description, item.lecturer, item.domain, item.assignee, item.request, item.time, item.status, item.maximum, item.created, item.performed, item.deadline, item.handicap, ''));
          });
          this.assignments = data;
          this.setRequests();
        });
      } else {
        this.router.navigate(['loading', 'newrequests']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  deleteRequest(assignment, user) {
    this.assignmentService.deleteRequest(assignment, user).subscribe();
    window.location.reload();
  }

  addAssignee(assignment, user) {
    this.assignmentService.addAssignee(assignment, user).subscribe();
    window.location.reload();
  }

  private setRequests() {
    this.assignments.forEach(item => {
      const dummy = new Assignment(item.name, item.description, item.lecturer, item.domain, item.assignee, item.request, item.time, item.status, item.maximum, item.created, item.performed, item.deadline, item.handicap, null);
      if (localStorage.getItem('username').toLowerCase() === dummy.lecturer.toLowerCase()) {
        this.parseRequests(dummy.request, dummy.name);
        const split = dummy.assignee.split(',');
        if (split[0] === '') {
          this.amountOfAssignees.push(0);
        } else {
          this.amountOfAssignees.push(split.length);
        }
      }
    });

    this.ready = true;
  }

  private parseRequests(toSplit, name) {
    const split = toSplit.split(',');

    if (split[0] === '') {
      this.amountOfRequests.push(0);
    } else {
      this.amountOfRequests.push(split.length);
    }

    split.forEach(item => {
      if (item !== '') {
        this.requests.push(new Request(item, name));
        this.found = true;
      } else {
        this.requests.push(null);
      }
    });
  }
}
