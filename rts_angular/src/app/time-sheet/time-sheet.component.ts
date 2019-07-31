import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'underscore';
import { NgProgress } from 'ngx-progressbar';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TimeSheetService } from '../Services/timeSheet.service';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css'],
  providers: [LoggedUserService]
})
export class TimeSheetComponent implements OnInit {

  private rtsUser: any;
  private rtsUserId: any;
  private userRole: any;
  private startDate: any;
  private fromDate: Date
  private days: any[];
  selectedDays: any[];
  weekSheet: any;

  constructor(
    private loggedUser: LoggedUserService,
    private activatedRoute: ActivatedRoute,
    private ngProgress: NgProgress,
    private toastr: ToastrService,
    private timeSheetService: TimeSheetService
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.userRole = this.rtsUser.role;
    this.days = [];
    this.selectedDays = [];
  }

  ngOnInit() {
    this.days[0] = "Sunday";
    this.days[1] = "Monday";
    this.days[2] = "Tuesday";
    this.days[3] = "Wednesday";
    this.days[4] = "Thursday";
    this.days[5] = "Friday";
    this.days[6] = "Saturday";
  }

  dateFilter() {
    this.ngProgress.start();
    this.selectedDays = [];
    if (this.days[this.startDate.getDay()] == 'Sunday') {
      this.selectedDays.push({ 'dateId': moment(this.startDate).format('YYYY-MM-DD') });
      for (const day of this.days) {
        const days = this.startDate.setDate(this.startDate.getDate() + 1);
        this.selectedDays.push({ 'dateId': moment(days).format('YYYY-MM-DD') });
      }
      this.selectedDays.pop();

      const days = {
        userId: this.rtsUserId,
        daySheets: this.selectedDays
      };

      this.timeSheetService.getWeekSheet(days)
        .subscribe(data => {
          console.log(data)
          this.ngProgress.done();
          if (data.success) {
            this.weekSheet = data.weekSheet.daySheets;
          }
        });
    } else {
      this.toastr.error('Please Select Sunday', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
      });
    }
  }

}
