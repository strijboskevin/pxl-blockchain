import {Component, OnInit} from '@angular/core';
import {Assignment} from '../models/Assignment';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentService} from '../services/assignment.service';
import {NavbarService} from '../services/navbar.service';
import {LoginService} from '../services/login.service';

@Component({
  providers: [AssignmentService],
  selector: 'app-assignment-component',
  templateUrl: './assignment.component.html',
})
export class AssignmentComponent implements OnInit {

  assignment: Assignment;
  canRequest = false;
  ready = false;
  jobtitle: string;
  username: string;

  constructor(private service: AssignmentService,
              private route: ActivatedRoute,
              private router: Router,
              public nav: NavbarService,
              private login: LoginService) {
  }

  ngOnInit() {
    this.jobtitle = localStorage.getItem('jobtitle');
    this.username = localStorage.getItem('username');
    this.nav.show();
    this.nav.element = 'assignment';
    const name = this.route.snapshot.params['name'];
    if (localStorage.getItem('username') !== null) {
      if (this.login.loggedIn) {
        this.load();
      } else {
        this.router.navigate(['loading', 'assignment/' + name]);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  private postRequest() {
    this.service.addRequest(this.assignment.name, localStorage.getItem('username')).subscribe();
    this.canRequest = false;
    this.router.navigate(['loading', 'myrequests']);
  }

  private load() {
    const name = this.route.snapshot.params['name'];
    this.service.getAssignment(name).subscribe(data => {
        this.assignment = data;
      },
      err => {
        console.log(err);
      },
      () => {
        const username = localStorage.getItem('username');
        console.log(this.assignment);
        if (this.assignment.request.indexOf(username) === -1 && this.assignment.assignee.indexOf(username) === -1 && this.assignment.status == 0) {
          this.canRequest = true;
        } else {
          this.canRequest = false;
        }

        this.ready = true;
      });
  }

  private deleteAssignee(name, assignee) {
    this.service.deleteAssignment(name, assignee).subscribe();
    window.location.reload();
  }
}
