import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {MessageService} from '../services/message.services';
import {Message} from '../models/Message';
import {LoginService} from '../services/login.service';

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
              private login: LoginService) {
  }

  ngOnInit() {
    this.jobtitle = localStorage.getItem('jobtitle');

    if (!this.jobtitle.includes('Personeel')) {
      this.username = this.route.snapshot.params['name'];
    } else {
      this.username = localStorage.getItem('username');
    }

    this.nav.show();
    this.nav.element = 'messages';
    if (localStorage.getItem('username') !== null) {
      if (this.login.loggedIn) {
        this.load();
      } else {
        if (!this.jobtitle.includes('Personeel')) {
          this.router.navigate(['loading', 'messages/' + this.username]);
        } else {
          this.router.navigate(['loading', 'messages']);

        }
      }
    } else {
      this.router.navigate(['']);
    }
  }

  private load() {
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
  }
}
