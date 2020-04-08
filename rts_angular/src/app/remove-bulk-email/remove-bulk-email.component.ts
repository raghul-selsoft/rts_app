import { Component, OnInit, Inject } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgProgress } from 'ngx-progressbar';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from '../Services/candidate.service';

@Component({
  selector: 'app-remove-bulk-email',
  templateUrl: './remove-bulk-email.component.html',
  styleUrls: ['./remove-bulk-email.component.css'],
  providers: [LoggedUserService]
})

export class RemoveBulkEmailComponent implements OnInit {
  rtsUser: any;
  rtsUserId: any;
  rtsCompanyId: any;
  addCustom = (item) => ({ name: item });
  selectedMails: any[];
  emails: any[];

  constructor(
    public dialogRef: MatDialogRef<RemoveBulkEmailComponent>,
    private candidateService: CandidateService,
    private loggedUser: LoggedUserService,
    private ngProgress: NgProgress,
    private toastr: ToastrService,
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.rtsCompanyId = this.rtsUser.companyId;
    this.emails = [];
    this.selectedMails = [];
  }

  ngOnInit() {
  }

  remove() {

    var mails = [];
    for (const id of this.selectedMails) {
      mails.push(id.name);
    }
    const companyId = {
      userId: this.rtsUserId,
      email: mails
    };

    this.candidateService.removeEmail(companyId)
      .subscribe(
        data => {
          this.ngProgress.done();
          if (data.success) {
            this.toastr.success(data.message, '', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
            this.dialogRef.close();
          } else {
            this.toastr.error(data.message, '', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
          }
        });
  }

}
