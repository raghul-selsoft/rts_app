import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/Services/api-url';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()
export class SubmissionService {

    constructor(private http: Http,
        private router: Router) { }

    addSubmission(submission) {
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.AddNewSubmission, submission,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            });
    }

    uploadFile(upload) {
        const formData = new FormData();
        const headers = new Headers();
        const token = localStorage.getItem('id_token');
        headers.append('Authorization', token);
        for (const file of upload.file) {
            formData.append('file', file);
        }

        formData.append('submissionId', upload.submissionId);
        formData.append('enteredBy', upload.enteredBy);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.FileUpload, formData, { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            });
    }
}
