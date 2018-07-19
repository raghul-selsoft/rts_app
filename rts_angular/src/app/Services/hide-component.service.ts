import { Injectable } from '@angular/core';

@Injectable()
export class HideComponentService {

  public displayComponent: boolean;
  public displayHeaderLogo: boolean;

  constructor() {
    this.displayComponent = true;
  }

}
