import {Component, HostListener, OnInit} from '@angular/core';
import {Assignment} from '../models/Assignment';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentService} from '../services/assignment.service';
import {NavbarService} from '../services/navbar.service';
import {TimerService} from '../services/timer.service';

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

  constructor(private service: AssignmentService,
              private route: ActivatedRoute,
              private router: Router,
              public nav: NavbarService,
              private timer: TimerService) {
  }

  ngOnInit() {
    this.jobtitle = localStorage.getItem('jobtitle');
    this.nav.show();
    this.nav.element = 'assignment';
    if (localStorage.getItem('username') !== null && this.timer.loaded) {
      const name = this.route.snapshot.params['name'];
      this.service.getAssignment(name).subscribe(data => {
          const dummy = data;
          this.assignment = new Assignment(dummy.name, dummy.description, dummy.lecturer, dummy.domain, dummy.assignee, dummy.request, dummy.time, dummy.status, dummy.maximum, dummy.created, dummy.performed, dummy.deadline, dummy.handicap, dummy.hash);
        },
        err => {
          console.log(err);
        },
        () => {
          const username = localStorage.getItem('username');
          if (this.assignment.request.indexOf(username) === -1 && this.assignment.assignee.indexOf(username) === -1 && this.assignment.status == 0) {
            this.canRequest = true;
          } else {
            this.canRequest = false;
          }

          this.ready = true;
        });
    } else {
      this.router.navigate(['']);
    }
  }

  postRequest() {
    this.service.addRequest(this.assignment.name, localStorage.getItem('username')).subscribe();
    this.canRequest = false;
    this.router.navigate(['/myrequests']);
  }
}
