import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LogsService {

  BASE_API_URL = 'http://10.50.70.21:3000';

  constructor(private http: HttpClient) {}

  getBween(start: string, end: string): Observable<any> {
    console.log(this.BASE_API_URL + '/logs/' + start + '/' + end);
    return this.http.get(this.BASE_API_URL + '/logs/' + start + '/' + end).catch(this.onError);
  }

  onError(res: Response): Observable<any> {
    const error = res.status + ': ' + res.statusText;
    return Observable.throw(error);
  }
}
