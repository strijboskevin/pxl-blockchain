import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AssignmentService} from '../services/assignment.service';
import {Assignment} from '../models/Assignment';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {Balance} from '../models/Balance';
import {MessageService} from '../services/message.services';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  providers: [AssignmentService, MessageService]
})
export class OverviewComponent implements OnInit {
  domains: Observable<string[]>;
  domainsObj: string[] = [];
  hours: number[] = [];
  assignments: Observable<Assignment[]>;
  assignmentsObj: Assignment[];
  domainsLoaded: boolean;
  assignmentsLoaded: boolean;
  ready: boolean;
  sum: Number = 0;
  balance: Balance;
  balanceLoaded: boolean;
  jobtitle: string;
  username: string;
  change: string;
  text: string;

  constructor(private authService: AuthService,
              private assignmentService: AssignmentService,
              private router: Router,
              public nav: NavbarService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private login: LoginService) {
  }

  ngOnInit() {
    this.jobtitle = localStorage.getItem('jobtitle');
    this.nav.show();
    this.nav.element = 'overview';

    if (!this.jobtitle.includes('Student')) {
      this.username = this.route.snapshot.params['name'];
    } else {
      this.username = localStorage.getItem('username');
    }

    if (localStorage.getItem('username') !== null) {
      if (this.login.loggedIn) {
        this.load();
      } else {
        if (!this.jobtitle.includes('Student')) {
          this.router.navigate(['loading', 'overview/' + this.username]);
        } else {
          this.router.navigate(['loading', 'overview']);
        }
      }
    } else if (localStorage.getItem('loggedin') == null) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.assignmentService.addBalance(this.username, parseInt(this.change, 10)).subscribe();
    window.location.reload();
  }

  onSubmitMessage() {
    this.messageService.addMessage(localStorage.getItem('username'), this.username, new Date().getTime().toString(), this.text, 'no').subscribe();
    window.location.reload();
  }

  private load() {
    this.assignments = this.assignmentService.getAssignmentsByUserByStatus(2, this.username);
    this.domains = this.assignmentService.getDomains();
    this.assignmentService.getDomains().subscribe(data => {
        this.domainsObj = data;
      },
      err => {
        console.log(err);
      },
      () => {
        this.domainsLoaded = true;
        this.setHours();
      });
    this.assignmentService.getAssignmentsByUserByStatus(2, this.username).subscribe(data => {
        this.assignmentsObj = data;
      },
      err => {
        console.log(err);
      },
      () => {
        this.assignmentsLoaded = true;
        this.setHours();
      });
    this.assignmentService.getBalance(this.username).subscribe(data => {
      console.log(data);
      this.balance = data;
      this.balanceLoaded = true;
    });
  }

  private setHours() {
    let x, y;

    if (this.domainsLoaded && this.assignmentsLoaded) {
      for (x = 0; x < this.domainsObj.length; x++) {
        for (y = 0; y < this.assignmentsObj.length; y++) {
          if (this.assignmentsObj[y].domain === this.domainsObj[x]) {
            if (this.hours[x] == null) {
              this.hours.push(parseInt(this.assignmentsObj[y].time, 10));
            } else {
              this.hours[x] = this.hours[x] + parseInt(this.assignmentsObj[y].time, 10);
            }

            this.sum = Number(this.assignmentsObj[y].time) + Number(this.sum);
          }
        }

        if (this.hours[x] === undefined) {
          this.hours.push(0);
        }
      }

      this.ready = true;
    }
  }
}
