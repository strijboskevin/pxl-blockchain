import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {Observable} from 'rxjs/Observable';
import {TimerService} from '../services/timer.service';

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

  constructor(private authService: AuthService,
              private assignmentService: AssignmentService,
              private router: Router,
              public nav: NavbarService,
              private route: ActivatedRoute,
              private timer: TimerService) {
  }

  ngOnInit() {
    this.jobtitle = localStorage.getItem('jobtitle');

    if (this.jobtitle === 'Personeel') {
      this.username = this.route.snapshot.params['name'];
    } else {
      this.username = localStorage.getItem('username');
    }

    this.nav.show();
    this.nav.element = 'studentassignments';
    if (localStorage.getItem('username') !== null && this.timer.loaded) {
      this.assignments = this.assignmentService.getAssignmentsByAssignee(this.username);
    } else {
      this.router.navigate(['']);
    }
  }

  toggleBusy() { this.busy = !this.busy; }

  toggleDone() { this.done = !this.done; }
}