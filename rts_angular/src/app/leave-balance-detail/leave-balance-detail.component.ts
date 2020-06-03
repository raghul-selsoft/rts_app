import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { NgProgress } from 'ngx-progressbar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeSheetService } from '../Services/timeSheet.service';
import * as moment from 'moment';

@Component({
  selector: 'app-leave-balance-detail',
  templateUrl: './leave-balance-detail.component.html',
  styleUrls: ['./leave-balance-detail.component.css'],
  providers: [LoggedUserService]
})
export class LeaveBalanceDetailComponent implements OnInit {

  rtsUser: any;
  rtsCompanyId: any;
  rtsUserId: any;
  userRole: any;
  currentDate: any;
  startDate: Date;
  leaveDetails: any;
  sickLeave: any;
  casualLeave: any;
  comboLeave: any;

  constructor(
    private loggedUser: LoggedUserService,
    private toastr: ToastrService,
    private router: Router,
    private ngProgress: NgProgress,
    private timeSheetService: TimeSheetService,
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsCompanyId = this.rtsUser.companyId;
    this.rtsUserId = this.rtsUser.userId;
    this.userRole = this.rtsUser.role;
    this.currentDate = new Date(Date.now());
    this.startDate = new Date(Date.now())
  }

  ngOnInit() {
    this.getLeaveRequests();
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

}
