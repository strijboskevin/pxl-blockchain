import {Component, OnInit} from '@angular/core';
import {AssignmentService} from '../services/assignment.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  providers: [AssignmentService]
})
export class ArchiveComponent implements OnInit {
  assignments: Observable<any>;
  busy: boolean;
  finished: boolean;
  open: boolean;
  jobtitle: string;

  constructor(private assignmentService: AssignmentService,
              private router: Router,
              public nav: NavbarService) {
  }

  ngOnInit() {
    this.jobtitle = localStorage.getItem('jobtitle');
    this.nav.show();
    this.nav.element = 'archive';
    if (localStorage.getItem('username') !== null) {
      this.assignments = this.assignmentService.getAssignments();
    } else {
      this.router.navigate(['']);
    }
  }
  private toggleBusy() { this.busy = !this.busy; }

  private toggleDone() { this.finished = !this.finished; }

  private toggleOpen() { this.open = !this.open; }
}
