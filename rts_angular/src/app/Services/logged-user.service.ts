import { Injectable } from '@angular/core';

@Injectable()
export class LoggedUserService {
  public loggedUser: any;

  constructor() {
    this.loggedUser = localStorage.getItem('rts_user');
  }

}
