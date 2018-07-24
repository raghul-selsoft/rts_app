import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequirementsService } from '../Services/requirements.service';
import { SubmissionService } from '../Services/submission.service';
import { CandidateService } from '../Services/candidate.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-add-new-submissions',
  templateUrl: './add-new-submissions.component.html',
  styleUrls: ['./add-new-submissions.component.css'],
  providers: [LoggedUserService]
})
export class AddNewSubmissionsComponent implements OnInit {

  public myForm: FormGroup;
  private rtsUser: any;
  private rtsUserId: any;
  private requirementsDetails: any;
  private files: any;
  private getFiles: any;
  private rtsCompanyId: any;
  private status: any;
  private selectedCandidate: any;
  private technologies: any;
  private isCandidate: boolean;
  private selectRequiement: any;

  constructor(
    private loggedUser: LoggedUserService,
    private requirementService: RequirementsService,
    private candidateService: CandidateService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private submissionService: SubmissionService,
    private router: Router
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.rtsCompanyId = this.rtsUser.companyId;
    this.getFiles = [];
    this.selectedCandidate = {};
    // this.selectRequiement = {};
    this.status = [
      { 'name': 'Open', 'value': 'open' },
      { 'name': 'In-Progress', 'value': 'inprogress' },
      { 'name': 'Closed', 'value': 'closed' }
    ];
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      requirements: ['', Validators.required],
      candidateEmail: [''],
      candidatePhone: [''],
      candidateName: [''],
      accountName: [''],
      // location: [''],
      clientRate: [''],
      sellingRate: [''],
      status: [''],
      availability: [''],
      technology: [''],
      workLocation: [''],
      candidateImmigirationStatus: [''],
      candidateLocation: [''],
      skype: [''],
      linkedIn: [''],
      c2c: [''],
    });
    this.getAllRequirements();
    // this.getCommonDetails();
  }


  // getCommonDetails() {
  //   const companyId = {
  //     companyId: this.rtsCompanyId
  //   };

  //   this.requirementService.commonDetails(companyId)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         if (data.success) {
  //           this.technologies = data.technologies;
  //         }
  //       });
  // }

  getAllRequirements() {
    const userId = {
      companyId: this.rtsCompanyId
    };

    this.requirementService.requirementsDetails(userId)
      .subscribe(
        data => {
          if (data.success) {
            this.requirementsDetails = data.requirements;
            console.log(this.requirementsDetails);
          }
        });
  }

  getRequirement(event) {
    this.selectRequiement = _.findWhere(this.requirementsDetails, { requirementId: event });
    console.log(this.selectRequiement);
  }

  fileChangeEvent(event: any) {
    this.files = event.target.files;
    for (const file of this.files) {
      this.getFiles.push(file);
    }
  }

  removeFile(file) {
    const clear = this.getFiles.indexOf(file);
    this.getFiles.splice(clear, 1);
  }

  getCandidateDetails() {
    const candidate = {
      email: this.myForm.controls.candidateEmail.value,
      companyId: this.rtsCompanyId
    };
    console.log(candidate);

    this.candidateService.getCandidate(candidate)
      .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this.selectedCandidate = data.client;
            console.log(this.selectedCandidate);
            this.isCandidate = true;
          } else {
            this.isCandidate = false;
          }
        });
    console.log(this.selectedCandidate);
  }


  addNewSubmission(form: FormGroup) {

    const submission = {
      requirementId: form.value.requirements,
      location: form.value.location,
      accountName: form.value.accountName,
      rate: form.value.rate,
      workLocation: form.value.workLocation,
      enteredBy: this.rtsUserId,
      candidateId: this.selectedCandidate.candidateId
    };


    console.log(submission);

    this.submissionService.addSubmission(submission)
      .subscribe(
        data => {
          if (data.success) {

            if (this.getFiles.length > 0) {
              const upload = {
                file: this.getFiles,
                submissionId: data.submission.submissionId,
                enteredBy: this.rtsUserId
              };
              this.submissionService.uploadFile(upload).subscribe(
                file => {
                  if (file.success) {
                    this.toastr.success(file.message, '', {
                      positionClass: 'toast-top-center',
                      timeOut: 3000,
                    });
                  } else {
                    this.toastr.error(file.message, '', {
                      positionClass: 'toast-top-center',
                      timeOut: 3000,
                    });
                  }
                });
            }
            this.toastr.success('New Submission Successfully added', '', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
            this.router.navigate(['submissions']);

          } else {
            this.toastr.error(data.message, '', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
          }
        });
  }

}
