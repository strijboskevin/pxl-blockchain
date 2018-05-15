import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {MeService} from '../services/me.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import {tap} from 'rxjs/operators';
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
    this.jobtitle = 'Personeel';
    this.nav.show();
    this.nav.element = 'archive';
    if (localStorage.getItem('username') !== null) {
      this.assignments = this.assignmentService.getAssignments();
    } else if (localStorage.getItem('loggedin') == null) {
      this.router.navigate(['']);
    }
  }
  toggleBusy() { this.busy = !this.busy; }

  toggleDone() { this.finished = !this.finished; }

  toggleOpen() { this.open = !this.open; }
}
