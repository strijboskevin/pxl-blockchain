import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {Assignment} from '../models/Assignment';

@Injectable()
export class AssignmentService implements OnInit {

  BASE_API_URL = 'http://10.50.70.21:3000';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getOpenAssignments(user: string): Observable<any> {
    return this.http.get(this.BASE_API_URL + '/assignments/open/' + user).catch(this.onError);
  }

  deleteAssignment(name: string, assignee: string): Observable<any> {
    return this.http.delete(this.BASE_API_URL + '/assignments/' + name + '/' + assignee).catch(this.onError);
  }

  getAssignments(): Observable<any> {
    return this.http.get(this.BASE_API_URL + '/assignments').catch(this.onError);
  }

  changeStatus(name: string, status: number): Observable<any> {
    return this.http.put(this.BASE_API_URL + '/assignments/' + name + '/status/' + status, null);
  }

  addBalance(user: string, amount: Number): Observable<any> {
    return this.http.post(this.BASE_API_URL + '/balances', JSON.stringify({user: user, amount: amount})).catch(this.onError);
  }

  getBalance(user: string): Observable<any> {
    return this.http.get(this.BASE_API_URL + '/balances/' + user).catch(this.onError);
  }

  getDomains(): Observable<any> {
    return this.http.get(this.BASE_API_URL + '/domains').catch(this.onError);
  }

  getAssignment(name: string): Observable<any> {
    return this.http.get(this.BASE_API_URL + '/assignments/' + name).catch(this.onError);
  }

  getAssignmentsByLecturer(name: string): Observable<any> {
    return this.http.get(this.BASE_API_URL + '/assignments/lecturer/' + name).catch(this.onError);
  }

  reset(name: string): Observable<any> {
    return this.http.post(this.BASE_API_URL + '/assignments/reset/' + name, null).catch(this.onError);
  }

  getAssignmentsByUserByStatus(status: Number, user: string): Observable<any> {
    return this.http.get(this.BASE_API_URL + '/assignments/assignee/' + user + '/status/' + status).catch(this.onError);
  }

  getAssignmentsByAssignee(name: string): Observable<any> {
    return this.http.get(this.BASE_API_URL + '/assignments/assignee/' + name).catch(this.onError);
  }

  addAssignee(assignment: string, user: string): Observable<any> {
    return this.http.put(this.BASE_API_URL + '/assignments/' + assignment + '/assignee/' + user, null).catch(this.onError);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post(this.BASE_API_URL + '/assignments', assignment).catch(this.onError);
  }

  addRequest(assignment: string, user: string): Observable<any> {
    return this.http.post(this.BASE_API_URL + '/requests', {assignment: assignment, user: user}).catch(this.onError);
  }

  deleteRequest(assignment: Assignment, user: string): Observable<any> {
    return this.http.delete(this.BASE_API_URL + '/request/' + assignment + '/' + user).catch(this.onError);
  }

  getRequests(user: string): Observable<any> {
    return this.http.get(this.BASE_API_URL + '/request/student/' + user).catch(this.onError);
  }

  onError(res: Response): Observable<any> {
    const error = res.status + ': ' + res.statusText;
    return Observable.throw(error);
  }

}
