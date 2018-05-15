import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AssignmentComponent} from './assignments/assignment.component';
import {LoginComponent} from './login/login.component';
import {MyrequestsComponent} from './myrequests/myrequests.component';
import {NewrequestComponent} from './newrequests/newrequest.component';
import {StudentAssignmentsComponent} from './student_assignments/student_assignments.component';
import {LecturerAssignmentsComponent} from './lecturer_assignments/lecturer_assignments.component';
import {ArchiveComponent} from './archive/archive.component';
import {OverviewComponent} from './overview/overview.component';
import {MessagesComponent} from './messages/messages.component';
import {RedirectComponent} from './redirect/redirect.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'assignment/:name', component: AssignmentComponent},
  {path: 'myassignments/:name', component: StudentAssignmentsComponent},
  {path: 'myassignments', component: StudentAssignmentsComponent},
  {path: 'myrequests/:name', component: MyrequestsComponent},
  {path: 'myrequests', component: MyrequestsComponent},
  {path: 'newrequests', component: NewrequestComponent},
  {path: 'lecturerassignments', component: LecturerAssignmentsComponent},
  {path: 'archive', component: ArchiveComponent},
  {path: 'overview/:name', component: OverviewComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'messages/:name', component: MessagesComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'redirect', component: RedirectComponent}
]
