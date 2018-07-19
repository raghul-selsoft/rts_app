import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/Services/api-url';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class ClientService {
    constructor(private http: Http,
        private router: Router) { }

    addClient(client) {
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.AddClient, client,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            });
    }

    allClients(companyId) {
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetAllClientsForCompany, companyId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            });
    }
}
