import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/Services/api-url';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()
export class RequirementsService {

    constructor(private http: Http,
        private router: Router) { }

    requirementsDetails(userId) {
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetAllRequirementsByCompany, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            });
    }

    requirementsDetailsForUser(userId) {
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetAllRequiementsForUser, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            });
    }

    addRequirements(newRequirement) {
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.AddNewRequirement, newRequirement,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            });
    }
}
