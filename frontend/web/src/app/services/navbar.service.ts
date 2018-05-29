import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  visible: boolean;
  _element: string;

  constructor() { this.visible = false; }

  show() { this.visible = true; }

  set element(value: string) { this._element = value; }

  get element(): string { return this._element; }

}
