import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {Observable} from 'rxjs/Observable';
import {TimerService} from '../services/timer.service';

@Component({
  selector: 'app-lecturer-assignment',
  templateUrl: './lecturer_assignments.component.html',
  providers: [AssignmentService]
})
export class LecturerAssignmentsComponent implements OnInit {
  assignments: Observable<Assignment[]>;
  username: string;
  name: string;
  description: string;
  time: string;
  participants: string;
  created: string;
  domain: string;
  domains: string[];
  open: boolean;
  busy: boolean;
  finished: boolean;
  newAssignment: boolean;
  deadline: string;
  handicap: string;

  constructor(private authService: AuthService,
              private assignmentService: AssignmentService,
              private router: Router,
              public nav: NavbarService,
              private timer: TimerService) {
  }

  ngOnInit() {
    this.nav.show();
    this.nav.element = 'lecturerassignments';
    if (localStorage.getItem('username') !== null && this.timer.loaded) {
      this.username = localStorage.getItem('username');
      this.assignmentService.getDomains().subscribe(data => {
        this.domains = data;
      })
      this.assignments = this.assignmentService.getAssignmentsByLecturer(localStorage.getItem('username'));
    } else {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    const assignment = new Assignment(this.name, this.description, localStorage.getItem('username'), this.domain, '', '', this.time, 0, this.participants, new Date().getTime().toString(), '', new Date(this.deadline).getTime().toString(), this.handicap, '');
    this.assignmentService.addAssignment(assignment).subscribe();
    window.location.reload();
  }

  done(name: string) {
    this.assignmentService.changeStatus(name, 2).subscribe();
    window.location.reload();
  }

  start(name: string) {
    this.assignmentService.changeStatus(name, 1).subscribe();
    window.location.reload();
  }

  reset(name: string) {
    this.assignmentService.reset(name).subscribe();
    window.location.reload();
  }

  toggleBusy() { this.busy = !this.busy; }

  toggleDone() { this.finished = !this.finished; }

  toggleOpen() { this.open = !this.open; }

  toggleNew() { this.newAssignment = !this.newAssignment; }
}