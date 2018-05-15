import {Component, OnInit} from '@angular/core';
import {NavbarService} from '../services/navbar.service';
import {AuthService} from '../services/auth.service';
import {Assignment} from '../models/Assignment';
import {AssignmentService} from '../services/assignment.service';
import {MessageService} from '../services/message.services';
import {Observable} from 'rxjs/Observable';
import {Request} from '../models/Request';
import {Message} from '../models/Message';
import {TimerService} from '../services/timer.service';

@Component({
  selector: 'app-navbar-component',
  templateUrl: 'navbar.component.html',
  providers: [AssignmentService, MessageService]
})

export class NavbarComponent implements OnInit {

  jobtitle: string;
  requests: Observable<Assignment[]>;
  assignments: Observable<Assignment[]>;
  assignmentsByLecturer: Assignment[] = [];
  messages: Message[];
  messReady: boolean;
  unread: number;
  count: number;
  reqReady: boolean;

  constructor(public nav: NavbarService,
              public auth: AuthService,
              private assignmentService: AssignmentService,
              private messageService: MessageService,
              private timer: TimerService) {
  }

  ngOnInit(): void {
    if (this.timer.loaded) {
      this.jobtitle = localStorage.getItem('jobtitle');

      this.requests = this.assignmentService.getRequests(localStorage.getItem('username'));
      this.assignments = this.assignmentService.getAssignmentsByUserByStatus(1, localStorage.getItem('username'));

      this.assignmentService.getAssignmentsByLecturer(localStorage.getItem('username')).subscribe(data => {
        const dummy = data;

        dummy.forEach(item => {
          this.assignmentsByLecturer.push(new Assignment(item.name, item.description, item.lecturer, item.domain, item.assignee, item.request, item.time, item.status, item.maximum, item.created, item.performed, item.deadline, item.handicap, ''));
        });

        this.countRequests();
      });

      this.messageService.getMessagesByUser(localStorage.getItem('username')).subscribe(data => {
          this.messages = data;
        },
        err => {
          console.log(err);
        },
        () => {
          this.countUnread();
        });
    }
  }

  private countRequests() {
    this.count = 0;
    let index;

    if (this.assignmentsByLecturer !== undefined) {
      for (index = 0; index < this.assignmentsByLecturer.length; index++) {
        if (this.assignmentsByLecturer[index].lecturer === localStorage.getItem('username')) {
          if (this.assignmentsByLecturer[index].request.split(',')[0] !== '') {
            this.count = this.count + this.assignmentsByLecturer[index].request.split(',').length;
          }
        }
      }
    }

    this.reqReady = true;
  }

  logout() {
    this.auth.logout();
  }

  private countUnread() {
    let index;
    this.unread = 0;

    for (index = 0; index < this.messages.length; index++) {
      if (this.messages[index].read === 'no') {
        this.unread = this.unread + 1;
      }
    }

    this.messReady = true;
  }
}
