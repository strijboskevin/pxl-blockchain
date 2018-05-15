import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {MessageService} from '../services/message.services';
import {Message} from '../models/Message';
import {TimerService} from '../services/timer.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  providers: [MessageService]
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  jobtitle: string;
  username: string;
  ready: boolean;

  constructor(private authService: AuthService,
              private messageService: MessageService,
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
    this.nav.element = 'messages';
    if (localStorage.getItem('username') !== null && this.timer.loaded) {
      this.messageService.getMessagesByUser(this.username).subscribe(data => {
          this.messages = data;
        },
        err => {
          console.log(err);
        },
        () => {
          this.ready = true;
          let index = 0;

          if (this.username === localStorage.getItem('username')) {
            for (index = 0; index < this.messages.length; index++) {
              if (this.messages[index].read === 'no') {
                this.messageService.changeRead(this.messages[index].sender, this.messages[index].timestamp, 'yes').subscribe();
              }
            }
          }
        });
    } else {
      this.router.navigate(['']);
    }
  }
}
