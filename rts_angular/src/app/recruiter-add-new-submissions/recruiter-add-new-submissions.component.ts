import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoggedUserService } from '../Services/logged-user.service';
import { RequirementsService } from '../Services/requirements.service';
import { ToastrService } from 'ngx-toastr';
import { SubmissionService } from '../Services/submission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-add-new-submissions',
  templateUrl: './recruiter-add-new-submissions.component.html',
  styleUrls: ['./recruiter-add-new-submissions.component.css'],
  providers: [LoggedUserService]
})
export class RecruiterAddNewSubmissionsComponent implements OnInit {

  public myForm: FormGroup;
  rtsUser: any;
  rtsUserId: any;
  requirementsDetails: any;
  files: any;
  getFiles: any;
  rtsCompanyId: any;

  constructor(
    private loggedUser: LoggedUserService,
    private requirementService: RequirementsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private submissionService: SubmissionService,
    private router: Router
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.getFiles = [];
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      requirements: ['', Validators.required],
      candidateName: [''],
      accountName: [''],
      location: [''],
      rate: ['', Validators.required],
      availability: [''],
      technology: [''],
      workLocation: ['']
    });
    this.getAllRequirementsForUser();
  }
  getAllRequirementsForUser() {

    const userId = {
      userId: this.rtsUserId
    };
    console.log(this.rtsUserId);

    this.requirementService.requirementsDetailsForUser(userId)
      .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this.requirementsDetails = data.requirements;
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

  addNewSubmission(form: FormGroup) {

    const submission = {
      requirementId: form.value.requirements,
      candidateName: form.value.candidateName,
      location: form.value.location,
      accountName: form.value.accountName,
      rate: form.value.rate,
      availability: form.value.availability,
      technology: form.value.technology,
      workLocation: form.value.workLocation,
      enteredBy: this.rtsUserId,
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
            this.router.navigate(['recruiter-submissions']);

          } else {
            this.toastr.error(data.message, '', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
          }
        });
  }
}
