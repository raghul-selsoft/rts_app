import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { RequirementsService } from '../Services/requirements.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubmissionService } from '../Services/submission.service';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from '../Services/candidate.service';

@Component({
  selector: 'app-edit-submissions',
  templateUrl: './edit-submissions.component.html',
  styleUrls: ['./edit-submissions.component.css'],
  providers: [LoggedUserService]
})
export class EditSubmissionsComponent implements OnInit {
  public myForm: FormGroup;
  rtsUser: any;
  rtsUserId: any;
  rtsCompanyId: any;
  submissionId: any;
  selectedSubmission: any;
  requirementsDetails: any;
  getFiles: any;
  files: any;
  deletedMediaFiles: any;
  status: any;
  isRejected: boolean;
  selectedRequirement: any;
  sendToClient: boolean;
  addCandidate: boolean;

  constructor(private loggedUser: LoggedUserService,
    private requirementService: RequirementsService,
    private activatedRoute: ActivatedRoute,
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
    this.deletedMediaFiles = [];
    this.status = [
      { 'name': 'In-Progress', 'value': 'IN-PROGRESS' },
      { 'name': 'Closed', 'value': 'CLOSED' },
      { 'name': 'Approved', 'value': 'APPROVED' },
      { 'name': 'Rejected', 'value': 'REJECTED' }
    ];
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.submissionId = params['id'];
      });

    this.myForm = this.formBuilder.group({
      requirements: ['', Validators.required],
      candidateName: [''],
      clientContactname: [''],
      clientContactEmail: [''],
      accountName: [''],
      location: [''],
      clientRate: [''],
      sellingRate: [''],
      status: [''],
      reasonForRejection: [''],
      availability: [''],
      candidateEmail: [''],
      candidatePhone: [''],
      candidateLocation: [''],
      candidateImmigirationStatus: [''],
      technology: [''],
      workLocation: [''],
      skype: [''],
      linkedIn: [''],
      interviewStatus: [''],
      currentStatus: [''],
      level1Date: [''],
      level2Date: ['']
    });
    this.getAllRequirements();
  }

  getAllRequirements() {

    const userId = {
      companyId: this.rtsCompanyId
    };

    this.requirementService.requirementsDetails(userId)
      .subscribe(
        data => {
          if (data.success) {
            this.requirementsDetails = data.requirements;
            for (const sub of this.requirementsDetails) {
              const submission = _.findWhere(sub.submissions, { submissionId: this.submissionId });
              if (submission !== undefined) {
                this.selectedSubmission = submission;
              }
            }
            console.log(this.selectedSubmission);
            this.selectedRequirement = _.findWhere(this.requirementsDetails, { requirementId: this.selectedSubmission.requirementId });
            if (this.selectedSubmission.status === 'REJECTED') {
              this.isRejected = true;
            }
            if (this.selectedSubmission.approvedByAdmin === true) {
              this.sendToClient = true;
            } else {
              this.sendToClient = false;
            }
          }
        });
  }

  getRequirement(event) {
    this.selectedRequirement = _.findWhere(this.requirementsDetails, { requirementId: event });
    console.log(this.selectedRequirement);
  }

  getCandidateDetails() {
    const candidate = {
      email: this.myForm.controls.candidateEmail.value,
      companyId: this.rtsCompanyId
    };

    this.candidateService.getCandidate(candidate)
      .subscribe(
        data => {
          if (data.success) {
            this.selectedSubmission.candidate = data.candidate;
            this.addCandidate = false;
          } else {
            this.addCandidate = true;
            this.toastr.error(data.message, '', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
          }
        });
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

  removeUploadedFile(media) {
    this.deletedMediaFiles.push(media.mediaId);
    const clear = this.selectedSubmission.mediaFiles.indexOf(media);
    this.selectedSubmission.mediaFiles.splice(clear, 1);
  }

  changeStatus(event) {
    if (event === 'REJECTED') {
      this.isRejected = true;
    } else {
      this.isRejected = false;
    }
  }


  updateSubmission(form: FormGroup) {

    const submission = {
      requirementId: form.value.requirements,
      candidateName: form.value.candidateName,
      location: form.value.location,
      accountName: form.value.accountName,
      clientRate: form.value.clientRate,
      sellingRate: form.value.sellingRate,
      clientContactname: form.value.clientContactname,
      clientContactEmail: form.value.clientContactEmail,
      workLocation: form.value.workLocation,
      status: form.value.status,
      reasonForRejection: form.value.reasonForRejection,
      interviewStatus: form.value.interviewStatus,
      currentStatus: form.value.currentStatus,
      dateOfLevel1: form.value.level1Date,
      dateOfLevel2: form.value.level2Date,
      enteredBy: this.rtsUserId,
      submissionId: this.submissionId,
      candidateId: this.selectedSubmission.candidate.candidateId,
      approvalUserId: this.rtsUserId
    };
    const editSubmission = {
      submission: submission,
      deletedMediaFiles: this.deletedMediaFiles
    };

    console.log(editSubmission);

    this.submissionService.editSubmission(editSubmission)
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
            this.toastr.success('Update Submission Successfully', '', {
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

