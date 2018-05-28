import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {Observable} from 'rxjs/Observable';
import {TimerService} from '../services/timer.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-student-assignment',
  templateUrl: './student_assignments.component.html',
  providers: [AssignmentService]
})
export class StudentAssignmentsComponent implements OnInit {
  assignments: Observable<Assignment[]>;
  busy: boolean;
  done: boolean;
  jobtitle: string;
  username: string;
  date: string;

  constructor(private authService: AuthService,
              private assignmentService: AssignmentService,
              private router: Router,
              public nav: NavbarService,
              private route: ActivatedRoute,
              private login: LoginService) {
  }

  ngOnInit() {
    this.jobtitle = localStorage.getItem('jobtitle');
    this.date = new Date().getTime().toString(10);

    if (!this.jobtitle.includes('Student')) {
      this.username = this.route.snapshot.params['name'];
    } else {
      this.username = localStorage.getItem('username');
    }

    this.nav.show();
    this.nav.element = 'studentassignments';
    if (localStorage.getItem('username') !== null) {
      if (this.login.loggedIn) {
        this.assignments = this.assignmentService.getAssignmentsByAssignee(this.username);
      } else {
        if (!this.jobtitle.includes('Student')) {
          this.router.navigate(['loading', 'myassignments/' + this.username]);
        } else {
          this.router.navigate(['loading', 'myassignments']);

        }
      }
    } else {
      this.router.navigate(['']);
    }
  }

  toggleBusy() { this.busy = !this.busy; }

  toggleDone() { this.done = !this.done; }

  convert(num) {
    return parseInt(num, 10);
  }

  deleteAssignee(name) {
    this.assignmentService.deleteAssignment(name, localStorage.getItem('username')).subscribe();
    window.location.reload();
  }
}
