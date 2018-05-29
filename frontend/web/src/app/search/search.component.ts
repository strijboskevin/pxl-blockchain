import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {LoginService} from '../services/login.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  assignments: Assignment[] = [];
  final: string[] = [];
  search: string;

  constructor(private assignmentsService: AssignmentService,
              private router: Router,
              public nav: NavbarService,
              private login: LoginService) {
  }

  ngOnInit() {
    this.nav.show();
    this.nav.element = 'search';
    if (localStorage.getItem('username') !== null) {
      if (this.login.loggedIn) {
        this.assignmentsService.getAssignments().subscribe(data => {
          this.assignments = data;
        });
      } else {
        this.router.navigate(['loading', 'search']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  private onSubmit() {
    let x;

    for (x = 0; x < this.assignments.length; x++) {
      const assignees = this.assignments[x].assignee.split(', ');
      const requests = this.assignments[x].request.split(',');

      let y;

      for (y = 0; y < assignees.length; y++) {
        if (assignees[y].includes(this.search) && !this.found(assignees[y])) {
          this.final.push(assignees[y]);
        }
      }

      for (y = 0; y < requests.length; y++) {
        if (requests[y].includes(this.search) && !this.found(requests[y])) {
          this.final.push(requests[y]);
        }
      }
    }
  }

  private found(user: string) {
    let x;

    for (x = 0; x < this.final.length; x++) {
      if (this.final[x] === user) {
        return true;
      }
    }

    return false;
  }
}
