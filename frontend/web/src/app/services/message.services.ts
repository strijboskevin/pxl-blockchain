import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MessageService implements OnInit {

  BASE_API_URL = 'http://10.50.70.21:3000';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getMessagesByUser(user: string) {
    return this.http.get(this.BASE_API_URL + '/messages/' + user).catch(this.onError);
  }

  addMessage(sender: string, recipient: string, timestamp: string, text: string, read: string) {
    return this.http.post(this.BASE_API_URL + '/messages', JSON.stringify({
      sender: sender,
      recipient: recipient,
      timestamp: timestamp,
      text: text,
      read: read
    })).catch(this.onError);
  }

  changeRead(sender: string, timestamp: string, read: string) {
    return this.http.put(this.BASE_API_URL + '/messages/' + sender + '/' + timestamp + '/' + read, null).catch(this.onError);

  }

  onError(res: Response): Observable<any> {
    const error = res.status + ': ' + res.statusText;
    return Observable.throw(error);
  }

}
