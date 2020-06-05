import { Component, OnInit, Inject } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamService } from '../Services/team.service';
import { Router } from '@angular/router';
import { RequirementsService } from '../Services/requirements.service';
import * as _ from 'underscore';
import { TimeSheetService } from '../Services/timeSheet.service';
import { DialogData } from '../leave-request/leave-request.component';

@Component({
  selector: 'app-leave-alert',
  templateUrl: './leave-alert.component.html',
  styleUrls: ['./leave-alert.component.css'],
  providers: [LoggedUserService]
})
export class LeaveAlertComponent implements OnInit {
  rtsUser: any;
  rtsUserId: any;

  constructor(
    public dialogRef: MatDialogRef<LeaveAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private loggedUser: LoggedUserService,
    private requirementService: RequirementsService,
    private toastr: ToastrService,
    private teamService: TeamService,
    private router: Router,
    private dialog: MatDialog,
    private timeSheetService: TimeSheetService,
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  proceedLeaveRequest() {
    this.timeSheetService.leaveRequest(this.data.leaveRequest)
    .subscribe(
      data => {
        if (data.success) {
          this.toastr.success(data.message, '', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
          });
          this.dialogRef.close();
          this.router.navigate(['time-sheet']);
        }
        else {
          this.toastr.error(data.message, '', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
          });
          this.dialogRef.close();
        }
      });
  }

}
