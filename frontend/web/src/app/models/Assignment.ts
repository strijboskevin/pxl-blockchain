export class Assignment {

  private _name: string;
  private _description: string;
  private _lecturer: string;
  private _domain: string;
  private _assignee: string;
  private _request: string;
  private _time: string;
  private _status: number;
  private _maximum: string;
  private _created: string;
  private _performed: string;
  private _deadline: string;
  private _handicap: string;
  private _hash: string;

  constructor(name: string, description: string, lecturer: string, domain: string, assignee: string, request: string, time: string, status: number, maximum: string, created: string, performed: string, deadline: string, handicap: string, hash: string) {
    this._name = name;
    this._description = description;
    this._lecturer = lecturer;
    this._domain = domain;
    this._assignee = assignee;
    this._request = request;
    this._time = time;
    this._status = status;
    this._maximum = maximum;
    this._created = created;
    this._performed = performed;
    this._deadline = deadline;
    this._handicap = handicap;
    this._hash = hash;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get lecturer(): string {
    return this._lecturer;
  }

  set lecturer(value: string) {
    this._lecturer = value;
  }

  get domain(): string {
    return this._domain;
  }

  set domain(value: string) {
    this._domain = value;
  }

  get assignee(): string {
    return this._assignee;
  }

  set assignee(value: string) {
    this._assignee = value;
  }

  get request(): string {
    return this._request;
  }

  set request(value: string) {
    this._request = value;
  }

  get time(): string {
    return this._time;
  }

  set time(value: string) {
    this._time = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get maximum(): string {
    return this._maximum;
  }

  set maximum(value: string) {
    this._maximum = value;
  }

  get created(): string {
    return this._created;
  }

  set created(value: string) {
    this._created = value;
  }

  get performed(): string {
    return this._performed;
  }

  set performed(value: string) {
    this._performed = value;
  }


  get deadline(): string {
    return this._deadline;
  }

  set deadline(value: string) {
    this._deadline = value;
  }

  get handicap(): string {
    return this._handicap;
  }

  set handicap(value: string) {
    this._handicap = value;
  }


  get hash(): string {
    return this._hash;
  }

  set hash(value: string) {
    this._hash = value;
  }
}
