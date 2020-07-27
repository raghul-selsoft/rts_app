import { Component, OnInit, Inject } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, Sort } from '@angular/material';
import { TeamService } from '../Services/team.service';
import { Router } from '@angular/router';
import { RequirementsService } from '../Services/requirements.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { TimeSheetService } from '../Services/timeSheet.service';
import { SubmissionService } from '../Services/submission.service';
import { HideComponentService } from '../Services/hide-component.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-delivered-submissions',
  templateUrl: './delivered-submissions.component.html',
  styleUrls: ['./delivered-submissions.component.css'],
  providers: [LoggedUserService]
})
export class DeliveredSubmissionsComponent implements OnInit {
  rtsUser: any;
  rtsUserId: any;
  userRole: any;
  startDate: Date;
  selectedSubmissions: any;
  interviewsLength: any;
  sortedData: any;

  constructor(
    private loggedUser: LoggedUserService,
    private submissonService: SubmissionService,
    private hideComponent: HideComponentService,
    private ngProgress: NgProgress,
    private dialog: MatDialog
  ) {
    this.hideComponent.displayComponent = true;
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.userRole = this.rtsUser.role;
    this.startDate = new Date(Date.now());
  }

  ngOnInit() {
    this.ngProgress.start();
    this.getAllSelectedSubmissions();
  }

  getAllSelectedSubmissions() {
    const fromDate = moment(this.startDate).format('YYYY-MM-DD');
    const userId = {
      userId: this.rtsUserId,
      fromDate: fromDate
    };

    this.submissonService.GetAllSelectedSubmission(userId)
      .subscribe(
        data => {
          this.ngProgress.done();
          if (data.success) {
            this.selectedSubmissions = data.submissionReport;
            this.interviewsLength = this.selectedSubmissions.length;
            this.sortedData = this.selectedSubmissions.slice();
            let DELIVERED = 0, BACKOUT = 0;
            for (const sub of this.selectedSubmissions) {
              if (sub.interviewDetailStatus === 'DELIVERED') {
                DELIVERED++;
              } else if (sub.interviewDetailStatus === 'BACKOUT') {
                BACKOUT++;
              }
            }
            let DeliveredObj = {
              name: 'DELIVERED',
              value: DELIVERED
            };

            let BackoutObj = {
              name: 'BACKOUT',
              value: BACKOUT
            };

          }
        });
  }

  sortData(sort: Sort) {
    const data = this.selectedSubmissions.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'candidateName': return this.compare(a.name, b.name, isAsc);
        case 'clientName': return this.compare(a.client.name, b.client.name, isAsc);
        case 'joiningDate': return this.compare(a.joiningDateStr, b.joiningDateStr, isAsc);
        case 'recruiterName': return this.compare(a.recruiter.firstName, b.recruiter.firstName, isAsc);
        default: return 0;
      }
    });
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
