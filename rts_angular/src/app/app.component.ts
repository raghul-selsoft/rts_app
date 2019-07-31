import { Component, DoCheck, OnDestroy, HostListener } from '@angular/core';
import { LoggedUserService } from './Services/logged-user.service';
import { HideComponentService } from './Services/hide-component.service';
import { Router } from '@angular/router';
import { LoginService } from './login/login-service';
import { ToastrService } from 'ngx-toastr';
import { SubmissionsComponent } from './submissions/submissions.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { RecruiterDashboardComponent } from './dashboard/recruiter-dashboard/recruiter-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AccMgrDashboardComponent } from './dashboard/acc-mgr-dashboard/acc-mgr-dashboard.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { GraphExpansationComponent } from './graph-expansation/graph-expansation.component';
import { InterviewHistoryComponent } from './interview-history/interview-history.component';
import { CandidateReportComponent } from './candidate-report/candidate-report.component';
import { SearchCandidatesComponent } from './search-candidates/search-candidates.component';
import { TimeSheetService } from './Services/timeSheet.service';
import { ApiUrl } from 'src/app/Services/api-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoggedUserService]
})
export class AppComponent implements DoCheck, OnDestroy {
  displayComponent: boolean;
  rtsUser: any;
  userRole: any;
  rtsUserId: any;


  constructor(private loggedUser: LoggedUserService,
    private hideComponent: HideComponentService,
    private router: Router,
    private loginService: LoginService,
    private timeSheetService: TimeSheetService,
    private toastr: ToastrService,
  ) {
    this.displayComponent = this.hideComponent.displayComponent;
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
  }

  ngDoCheck() {
    this.displayComponent = this.hideComponent.displayComponent;
    this.rtsUser = JSON.parse(localStorage.getItem('rts_user'));
    if (this.rtsUser) {
      this.userRole = this.rtsUser.role;
    }
    const loginService = this.loginService;

    window.onbeforeunload = function (event) {
      // const token = localStorage.getItem('id_token');
      // const userId = localStorage.getItem('user_id');
      // const data = {
      //   sessionOutStr: "sessionOut",
      //   userId: parseInt(userId)
      // }

      // fetch(ApiUrl.BaseUrl + ApiUrl.TimeSheetInOrOut, {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': token
      //   }
      // }).then(res => res.json())
      //   .then(response => {
      //     loginService.logout();
      //   });
      // event.returnValue = '';
      var message = 'Important: Please click on \'Save\' button to leave this page.';
      if (typeof event == 'undefined') {
        event = window.event;
      }
      if (event) {
        const token = localStorage.getItem('id_token');
        const userId = localStorage.getItem('user_id');
        var xhr = new XMLHttpRequest();
        xhr.open('POST', ApiUrl.BaseUrl + ApiUrl.TimeSheetInOrOut);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', token);
        xhr.onload = function () {
          loginService.logout();
          return message;
        };
        xhr.send(JSON.stringify({
          sessionOutStr: "sessionOut",
          userId: parseInt(userId)
        }));
        event.returnValue = message;
      }
      return message;
    };
  }

  ngOnDestroy() {
    this.hideComponent.displayComponent = false;
  }

  refresh() {
    this.onLogout();
  }

  onLogout() {
    const userId = {
      sessionOutStr: "sessionOut",
      userId: this.rtsUser.userId
    };

    this.timeSheetService.timeSheetSession(userId)
      .subscribe(
        data => {
          if (data.success) {
          }
        });
    SubmissionsComponent.filterBy = undefined;
    SubmissionsComponent.userDetails = undefined;
    SubmissionsComponent.recruiter = undefined;
    RequirementsComponent.userDetails = undefined;
    RequirementsComponent.filterBy = undefined;
    RecruiterDashboardComponent.graphData = undefined;
    AdminDashboardComponent.graphData = undefined;
    AccMgrDashboardComponent.graphData = undefined;
    GenerateReportComponent.userDetails = undefined;
    RequirementsComponent.recruiter = undefined;
    RequirementsComponent.status = undefined;
    RequirementsComponent.client = undefined;
    RequirementsComponent.team = undefined;
    RequirementsComponent.clientStatus = undefined;
    GraphExpansationComponent.graphExpandDeatils = undefined;
    InterviewHistoryComponent.userDetails = undefined;
    InterviewHistoryComponent.recruiter = undefined;
    InterviewHistoryComponent.client = undefined;
    InterviewHistoryComponent.team = undefined;
    InterviewHistoryComponent.filterBy = undefined;
    CandidateReportComponent.userDetails = undefined;
    CandidateReportComponent.client = undefined;
    InterviewHistoryComponent.interviewStatus = undefined;
    SearchCandidatesComponent.skills = undefined;
    this.loginService.logout();
    this.toastr.success('You are logged out', '', {
      positionClass: 'toast-top-center',
      timeOut: 3000,
    });
    return false;
  }
}
