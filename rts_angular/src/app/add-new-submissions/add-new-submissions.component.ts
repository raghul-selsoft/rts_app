import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequirementsService } from '../Services/requirements.service';
import { SubmissionService } from '../Services/submission.service';

@Component({
  selector: 'app-add-new-submissions',
  templateUrl: './add-new-submissions.component.html',
  styleUrls: ['./add-new-submissions.component.css'],
  providers: [LoggedUserService]
})
export class AddNewSubmissionsComponent implements OnInit {

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
    this.rtsCompanyId = this.rtsUser.companyId;
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
