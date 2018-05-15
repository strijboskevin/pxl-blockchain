import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {HttpService} from './services/http.service';
import {AuthService} from './services/auth.service';
import {AssignmentService} from './services/assignment.service';
import {routes} from './routes';
import {AssignmentComponent} from './assignments/assignment.component';
import {MeService} from './services/me.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/AuthInterceptor';
import {NavbarService} from './services/navbar.service';
import {NavbarComponent} from './navbar/navbar.component';
import {MyrequestsComponent} from './myrequests/myrequests.component';
import {NewrequestComponent} from './newrequests/newrequest.component';
import {StudentAssignmentsComponent} from './student_assignments/student_assignments.component';
import {LecturerAssignmentsComponent} from './lecturer_assignments/lecturer_assignments.component';
import {FormsModule} from '@angular/forms';
import {ArchiveComponent} from './archive/archive.component';
import {OverviewComponent} from './overview/overview.component';
import {MessageService} from './services/message.services';
import {MessagesComponent} from './messages/messages.component';
import {RedirectComponent} from './redirect/redirect.component';
import {TimerService} from './services/timer.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AssignmentComponent,
    NavbarComponent,
    MyrequestsComponent,
    NewrequestComponent,
    StudentAssignmentsComponent,
    LecturerAssignmentsComponent,
    ArchiveComponent,
    OverviewComponent,
    MessagesComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  },
    HttpService,
    AuthService,
    MeService,
    AssignmentService,
    NavbarService,
    MessageService,
    TimerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
