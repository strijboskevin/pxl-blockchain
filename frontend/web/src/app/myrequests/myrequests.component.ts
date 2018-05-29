import {Component, OnInit} from '@angular/core';
import {Assignment} from '../models/Assignment';
import {AssignmentService} from '../services/assignment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.component.html',
  providers: [AssignmentService]
})
export class MyrequestsComponent implements OnInit {

  requests: Assignment[];
  jobtitle: string;
  username: string;

  constructor(private assignmentService: AssignmentService,
              private router: Router,
              public nav: NavbarService,
              private route: ActivatedRoute,
              private login: LoginService) {
  }

  ngOnInit() {
    this.jobtitle = localStorage.getItem('jobtitle');

    if (!this.jobtitle.includes('Student')) {
      this.username = this.route.snapshot.params['name'];
    } else {
      this.username = localStorage.getItem('username');
    }

    this.nav.show();
    this.nav.element = 'myrequests';
    if (localStorage.getItem('username') !== null) {
      if (this.login.loggedIn) {
        this.setRequests();
      } else {
        if (!this.jobtitle.includes('Student')) {
          this.router.navigate(['loading', 'myrequests/' + this.username]);
        } else {
          this.router.navigate(['loading', 'myrequests']);
        }
      }
    } else {
      this.router.navigate(['']);
    }
  }

  private deleteRequest(assignment: Assignment) {
      this.assignmentService.deleteRequest(assignment, this.username).subscribe();
      window.location.reload();
  }

  private setRequests() {
    this.assignmentService.getRequests(this.username).subscribe(data => {
      this.requests = data;
    });
  }
}
