export class Message {

  private _sender: string;
  private _recipient: string;
  private _timestamp: string;
  private _text: string;
  private _read: string;


  constructor(sender: string, recipient: string, timestamp: string, text: string, read: string) {
    this._sender = sender;
    this._recipient = recipient;
    this._timestamp = timestamp;
    this._text = text;
    this._read = read;
  }

  get sender(): string {
    return this._sender;
  }

  set sender(value: string) {
    this._sender = value;
  }

  get recipient(): string {
    return this._recipient;
  }

  set recipient(value: string) {
    this._recipient = value;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  set timestamp(value: string) {
    this._timestamp = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }


  get read(): string {
    return this._read;
  }

  set read(value: string) {
    this._read = value;
  }
}
