import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../services/login.service';

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
              private login: LoginService) {
  }

  ngOnInit() {
    this.nav.show();
    this.nav.element = 'lecturerassignments';
    if (localStorage.getItem('username') !== null && localStorage.getItem('jobtitle').includes('Personeel')) {
      if (this.login.loggedIn) {
        this.username = localStorage.getItem('username');
        this.assignmentService.getDomains().subscribe(data => {
          this.domains = data;
        });
        this.assignments = this.assignmentService.getAssignmentsByLecturer(localStorage.getItem('username'));
      } else {
        this.router.navigate(['loading', 'lecturerassignments']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  private onSubmit() {
    let assignment;

    if (this.domain !== 'Seminaries') {
      assignment = new Assignment(this.name, this.description, localStorage.getItem('username'), this.domain, '', '', this.time, 0, this.participants, new Date().getTime().toString(), '', new Date(this.deadline).getTime().toString(), this.handicap, '');
    } else { // Set handicap to 100
      assignment = new Assignment(this.name, this.description, localStorage.getItem('username'), this.domain, '', '', this.time, 0, this.participants, new Date().getTime().toString(), '', new Date(this.deadline).getTime().toString(), '100', '');
    }

    this.assignmentService.addAssignment(assignment).subscribe();
    window.location.reload();
  }

  private done(name: string) {
    this.assignmentService.changeStatus(name, 2).subscribe();
    window.location.reload();
  }

  private start(name: string) {
    this.assignmentService.changeStatus(name, 1).subscribe();
    window.location.reload();
  }

  private reset(name: string) {
    this.assignmentService.reset(name).subscribe();
    window.location.reload();
  }

  private toggleBusy() {
    this.busy = !this.busy;
  }

  private toggleDone() {
    this.finished = !this.finished;
  }

  private toggleOpen() {
    this.open = !this.open;
  }

  private toggleNew() {
    this.newAssignment = !this.newAssignment;
  }
}
