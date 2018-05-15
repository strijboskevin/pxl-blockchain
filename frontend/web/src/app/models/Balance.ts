export class Balance {

  private _user: string;
  private _amount: string;


  constructor(user: string, amount: string) {
    this._user = user;
    this._amount = amount;
  }


  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }

  get amount(): string {
    return this._amount;
  }

  set amount(value: string) {
    this._amount = value;
  }
}
