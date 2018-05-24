export class Log {

  private _timestamp: string;
  private _log: string;


  constructor(timestamp: string, log: string) {
    this._timestamp = timestamp;
    this._log = log;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  set timestamp(value: string) {
    this._timestamp = value;
  }

  get log(): string {
    return this._log;
  }

  set log(value: string) {
    this._log = value;
  }
}
