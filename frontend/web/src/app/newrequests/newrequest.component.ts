import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {Request} from '../models/Request';
import {MeService} from '../services/me.service';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
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
          data.forEach(item => {
            this.assignments.push(item);
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

  private deleteRequest(assignment, user) {
    this.assignmentService.deleteRequest(assignment, user).subscribe();
    window.location.reload();
  }

  private addAssignee(assignment, user) {
    this.assignmentService.addAssignee(assignment, user).subscribe();
    window.location.reload();
  }

  private setRequests() {
    this.assignments.forEach(item => {
      const dummy: Assignment = item;
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
