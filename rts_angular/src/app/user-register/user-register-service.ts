import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiUrl } from '../Services/api-url';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  registerUser(userRegister) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(ApiUrl.BaseUrl + ApiUrl.AddCompanyUser, userRegister,
      { headers: headers })
      .map(res => res.json());
  }
}
