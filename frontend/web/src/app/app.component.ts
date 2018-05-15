import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import {TimerService} from './services/timer.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  providers: [TimerService]
})
export class AppComponent {

  constructor(private timer: TimerService) {}

}
