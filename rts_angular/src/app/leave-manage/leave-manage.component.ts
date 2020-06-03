import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'underscore';
import { NgProgress } from 'ngx-progressbar';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TimeSheetService } from '../Services/timeSheet.service';
import { UserService } from '../Services/user.service';
import { MatDialog } from '@angular/material';
import { CancelLeaveRequestComponent } from '../cancel-leave-request/cancel-leave-request.component';
import { DetailedLeaveRequestComponent } from '../detailed-leave-request/detailed-leave-request.component';
import { HolidayListPopupComponent } from '../holiday-list-popup/holiday-list-popup.component';
import { LeaveBalanceDetailComponent } from '../leave-balance-detail/leave-balance-detail.component';

export interface DialogData {
  userId: any;
  dateId: any;
}

@Component({
  selector: 'app-leave-manage',
  templateUrl: './leave-manage.component.html',
  styleUrls: ['./leave-manage.component.css'],
  providers: [LoggedUserService]
})
export class LeaveManageComponent implements OnInit {
  rtsUser: any;
  rtsUserId: any;
  userRole: any;
  startDate: Date;
  rtsCompanyId: any;
  leaveRequests: any;
  leaveDetails: any;
  sickLeave: number;
  comboLeave: any;
  casualLeave: any;
  upcomingHoliday: any;

  constructor(
    private loggedUser: LoggedUserService,
    private activatedRoute: ActivatedRoute,
    private ngProgress: NgProgress,
    private toastr: ToastrService,
    private timeSheetService: TimeSheetService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.userRole = this.rtsUser.role;
    this.rtsCompanyId = this.rtsUser.companyId;
    this.startDate = new Date(Date.now())
    this.leaveRequests = [];
  }

  ngOnInit() {
    this.getLeaveRequests();
    this.upcomingHolidays();
    this.getRecentTranscations();
  }

  getRecentTranscations() {

    const dateId = moment(this.startDate).format('YYYY-MM');

    const userId = {
      userId: this.rtsUserId,
      dateId: dateId,
      companyId: this.rtsCompanyId
    };

    this.timeSheetService.getLeaveRequest(userId)
      .subscribe(
        data => {
          this.ngProgress.done();
          if (data.success) {
            this.leaveRequests = data.leaveRequest;
          }
        });
  }
  getLeaveRequests() {

    const dateId = moment(this.startDate).format('YYYY');

    const userId = {
      userId: this.rtsUserId,
      dateId: dateId,
    };

    this.timeSheetService.leaveHistory(userId)
      .subscribe(
        data => {
          this.ngProgress.done();
          if (data.success) {
            this.leaveDetails = data.daySheets;
            this.sickLeave = this.leaveDetails.sickLeave.length;
            this.casualLeave = this.leaveDetails.casualLeave.length;
            this.comboLeave = this.leaveDetails.comboOff.length;

          }
        });
  }

  upcomingHolidays() {

    const dateId = moment(this.startDate).format('YYYY-MM-DD');

    const userId = {
      userId: this.rtsUserId,
      dateId: dateId,
    };

    this.timeSheetService.upComingHolidays(userId)
      .subscribe(
        data => {
          this.ngProgress.done();
          if (data.success) {
            this.upcomingHoliday = data.upcomingHoliday;
          }
        });
  }

  getLeaveDetails() {
    const dialogRef = this.dialog.open(DetailedLeaveRequestComponent, {
      height: '400px',
      width: '1200px',
      data: {}
    });
  }

  getHolidays() {
    const dialogRef = this.dialog.open(HolidayListPopupComponent, {
      height: '400px',
      width: '1200px',
      data: {}
    });
  }

  getleaveBalance() {
    const dialogRef = this.dialog.open(LeaveBalanceDetailComponent, {
      height: '500px',
      width: '1200px',
      data: {}
    });
  }
  // cancelLeaveRequest(dateId) {

  //   const dialogRef = this.dialog.open(CancelLeaveRequestComponent, {
  //     width: '500px',
  //     data: { userId: parseInt(this.rtsUserId), dateId: dateId }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getLeaveRequests();
  //   });

  // }

}
