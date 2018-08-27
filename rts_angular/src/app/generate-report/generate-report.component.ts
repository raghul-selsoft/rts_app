import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { RequirementsService } from '../Services/requirements.service';
import { HideComponentService } from '../Services/hide-component.service';
import { SubmissionService } from '../Services/submission.service';
import * as moment from 'moment';
import { ApiUrl } from '../Services/api-url';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
  providers: [LoggedUserService]
})
export class GenerateReportComponent implements OnInit {

  private rtsUser: any;
  private rtsUserId: any;
  private submissions: any;
  private requirements: any;
  private approvedsubmissions: any;
  private rtsCompanyId: any;
  private currentDate: Date;
  private approvedsubmissionsLength: any;
  private userRole: any;
  private baseUrl: any;
  public myForm: FormGroup;
  private startDate: any;
  private toDate: any;

  constructor(private loggedUser: LoggedUserService,
    private requirementService: RequirementsService,
    private submissonService: SubmissionService,
    private hideComponent: HideComponentService,
    private formBuilder: FormBuilder,
  ) {
    this.hideComponent.displayComponent = true;
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsCompanyId = this.rtsUser.companyId;
    this.userRole = this.rtsUser.role;
    this.rtsUserId = this.rtsUser.userId;
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
    this.toDate = moment(this.currentDate).format('YYYY-MM-DD');
    this.getApprovedSubmissions();
    this.baseUrl = ApiUrl.BaseUrl;
  }

  filterByDate(form: FormGroup) {

    if (form.value.fromDate !== 'Invalid date' && form.value.fromDate !== '') {
      this.startDate = moment(form.value.fromDate).format('YYYY-MM-DD');
    } else {
      this.startDate = '';
    }


    console.log(this.startDate, this.toDate);

  }

  getApprovedSubmissions() {

    const userId = {
      userId: this.rtsUserId,
    };

    this.submissonService.approvedSubmissionDetails(userId)
      .subscribe(
        data => {
          if (data.success) {
            this.approvedsubmissions = data.submissionReport;
            this.approvedsubmissionsLength = this.approvedsubmissions.length;
            for (const submission of this.approvedsubmissions) {
              const diff = Math.floor(this.currentDate.getTime() - submission.submissionDate);
              const day = 1000 * 60 * 60 * 24;
              const days = Math.floor(diff / day);
              const weeks = Math.floor(days / 7);
              const months = Math.floor(days / 31);
              const years = Math.floor(months / 12);
              if (days < 7) {
                submission.age = days + ' days ago';
              } else if (weeks < 4) {
                submission.age = weeks + ' weeks ago';
              } else if (months < 12) {
                submission.age = months + ' months ago';
              } else {
                submission.age = years + ' years ago';
              }
            }
          }
        });
  }

  generateReport() {

    const userId = {
      userId: this.rtsUserId,
    };

    this.submissonService.getReport(userId)
      .subscribe(
        data => {
          if (data.success) {
            window.open(this.baseUrl + data.downloadUrl, '_blank');
          }
        });

  }
}

