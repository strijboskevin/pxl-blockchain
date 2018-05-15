export class Request {

  private _user: string;
  private _assignment: string;


  constructor(user: string, assignment: string) {
    this._user = user;
    this._assignment = assignment;
  }

  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }

  get assignment(): string {
    return this._assignment;
  }

  set assignment(value: string) {
    this._assignment = value;
  }

}
