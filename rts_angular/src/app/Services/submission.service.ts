import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/Services/api-url';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoginService } from '../login/login-service';
import { AutoRefreshComponent } from '../auto-refresh/auto-refresh.component';



@Injectable()
export class SubmissionService {

    constructor(private http: Http,
        private router: Router,
        private loginService: LoginService) { }

    addSubmission(submission) {
        AutoRefreshComponent.reset.next(void 0);
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
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    saveSubmission(saveSubmission) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.SaveSubmission, saveSubmission,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    addComment(addMessage) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.AddComment, addMessage,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    editSubmission(editSubmission) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.UpdateSubmission, editSubmission,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    getUserSubmissions(userId) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetUserSubmission, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    getTeamSubmissions(userId) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetTeamSubmission, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    GetRecruiterSubmissionStatus(userId) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetRecruiterSubmissionStatus, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    submitToClient(submit) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.SubmissionToClient, submit,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    getRequirementBySubmission(submit) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetRequirementForSubmission, submit,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    approvedSubmissionDetails(userId) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GenerateReport, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    getAllInterviewDetails(userId) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetAllInterviewDetails, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    GetAllProgressInterviews(userId) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetAllProgressInterviews, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    GetAllOnBoardReminder(userId) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetAllOnBoardReminder, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    GetAllSelectedSubmission(userId) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.GetAllSelectedSubmission, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    getReport(userId) {
        AutoRefreshComponent.reset.next(void 0);
        const token = localStorage.getItem('id_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(ApiUrl.BaseUrl + ApiUrl.ReportDownload, userId,
            { headers: headers })
            .map(res => {
                const responseToken = res.headers.get('refresh-token');
                localStorage.setItem('id_token', responseToken);
                return res.json();
            }).catch(err => {
                if (err.status === 401) {
                    this.loginService.logout();
                }
                return '{}';
            });
    }

    // uploadFile(upload) {
    //     const formData = new FormData();
    //     const headers = new Headers();
    //     const token = localStorage.getItem('id_token');
    //     headers.append('Authorization', token);
    //     for (const file of upload.file) {
    //         formData.append('file', file);
    //     }

    //     formData.append('submissionId', upload.submissionId);
    //     formData.append('enteredBy', upload.enteredBy);

    //     return this.http.post(ApiUrl.BaseUrl + ApiUrl.SubmissionFileUpload, formData, { headers: headers })
    //         .map(res => {
    //             const responseToken = res.headers.get('refresh-token');
    //             localStorage.setItem('id_token', responseToken);
    //             return res.json();
    //         }).catch(err => {
    //             if (err.status === 401) {
    //                 this.loginService.logout();
    //             }
    //             return '{}';
    //         });
    // }
}
