import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { NgProgress } from 'ngx-progressbar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeSheetService } from '../Services/timeSheet.service';
import * as moment from 'moment';

@Component({
  selector: 'app-holiday-list-popup',
  templateUrl: './holiday-list-popup.component.html',
  styleUrls: ['./holiday-list-popup.component.css'],
  providers: [LoggedUserService]
})
export class HolidayListPopupComponent implements OnInit {

  rtsUser: any;
  rtsCompanyId: any;
  rtsUserId: any;
  userRole: any;
  currentDate: any;
  holidayList: any;
  holidayLength: any;

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
  }

  ngOnInit() {
    this.ngProgress.start();
    this.getAllHolidays();
  }
  getAllHolidays() {
    const currentYear = moment(this.currentDate).format('YYYY')
    const userId = {
      userId: this.rtsUserId,
      year: currentYear
    };

    this.timeSheetService.getHolidays(userId)
      .subscribe(
        data => {
          this.ngProgress.done();
          if (data.success) {
            this.holidayList = data.holidayList;
            this.holidayLength = this.holidayList.length;
          }
        });

  }

}
