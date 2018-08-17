import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { RequirementsService } from '../Services/requirements.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubmissionService } from '../Services/submission.service';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from '../Services/candidate.service';
import * as moment from 'moment';
import { ApiUrl } from '../Services/api-url';

@Component({
  selector: 'app-edit-submisson',
  templateUrl: './edit-submisson.component.html',
  styleUrls: ['./edit-submisson.component.css'],
  providers: [LoggedUserService]
})
export class EditSubmissonComponent implements OnInit {

  public myForm: FormGroup;

  private rtsUser: any;
  private userRole: any;
  private rtsUserId: any;
  private rtsCompanyId: any;
  private submissionId: any;
  private selectedSubmission: any;
  private requirementsDetails: any;
  private getFiles: any;
  private files: any;
  private deletedMediaFiles: any;
  private status: any;
  private isRejected: boolean;
  private selectedRequirement: any;
  private sendToClient: boolean;
  private addCandidate: boolean;
  private isSubmitToClient: boolean;
  private isNewCandidate: boolean;
  private technology: any[];
  private level1Date: string;
  private level2Date: string;
  private isEmployerDetails: boolean;
  private isC2c: boolean;
  private isOtherTechnology: boolean;
  private candidateGetFiles: any;
  private candidateFiles: any;
  private immigirationStatus: any;
  private recruiterName: any;
  private recruiterEmail: any;
  private clientRecruiterName: any;
  private clientRecruiterEmail: any;
  private allRequirements: any;
  private baseUrl: any;
  private isRelocate: boolean;
  private isWorkedWithClient: boolean;

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
    this.userRole = this.rtsUser.role;
    this.rtsCompanyId = this.rtsUser.companyId;
    this.recruiterName = [];
    this.recruiterEmail = [];
    this.getFiles = [];
    this.allRequirements = [];
    this.candidateGetFiles = [];
    this.deletedMediaFiles = [];
    this.status = [
      { 'name': 'In-Progress', 'value': 'IN-PROGRESS' },
      { 'name': 'TL Approved', 'value': 'TL_APPROVED' },
      { 'name': 'Approved', 'value': 'APPROVED' },
      { 'name': 'TL Rejeced', 'value': 'TL_REJECTED' },
      { 'name': 'Rejected', 'value': 'REJECTED' },
      { 'name': 'Closed', 'value': 'CLOSED' }
    ];
  }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.submissionId = params['id'];
      });

    this.baseUrl = ApiUrl.BaseUrl;

    this.myForm = this.formBuilder.group({
      requirements: [''],
      candidateName: [''],
      clientContactname: [''],
      clientContactEmail: [''],
      accountName: [''],
      location: [''],
      clientRate: [''],
      sellingRate: [''],
      buyingRate: [''],
      status: [''],
      reasonForRejection: [''],
      availability: [''],
      candidateEmail: ['', Validators.email],
      candidatePhone: [''],
      candidateLocation: [''],
      candidateImmigirationStatus: [''],
      technology: [''],
      workLocation: [''],
      relocate: [''],
      editRelocate: [''],
      interview: [''],
      experience: [''],
      resonForChange: [''],
      skype: [''],
      linkedIn: [''],
      interviewStatus: [''],
      currentStatus: [''],
      level1Date: [''],
      level2Date: [''],
      statusForLevel1: [''],
      statusForLevel2: [''],
      totalExperience: [''],
      otherTechnology: [''],
      employerName: [''],
      employerContactName: [''],
      employerPhone: [''],
      employerEmail: [''],
      c2c: [''],
      editWorkedWithClient: [''],
      epNumber: [''],
      authorizedWorkInUs: [''],
      workedClient: [''],
      anotherInterviewOffer: [''],
      vacationPlans: [''],
      currentCompany: [''],
    });

    this.getAllCommonData();

    if (this.userRole === 'ADMIN') {
      this.getAllRequirements();
    } else if (this.userRole === 'TL' || this.userRole === 'ACC_MGR') {
      this.getAllRequirementsForLeadUserAndAccountManager();
    }
  }

  getAllCommonData() {
    const company = {
      userId: this.rtsUserId
    };

    this.requirementService.commonDetails(company)
      .subscribe(data => {
        if (data.success) {
          this.technology = data.technologies;
        }
      });

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
            this.editSubmission(this.requirementsDetails);
          }
        });
  }

  getAllRequirementsForLeadUserAndAccountManager() {

    const userId = {
      userId: this.rtsUserId
    };

    this.requirementService.requirementsDetailsByTeam(userId)
      .subscribe(
        data => {
          if (data.success) {
            this.requirementsDetails = data.requirements;
            this.editSubmission(this.requirementsDetails);
          }
        });
  }

  editSubmission(allRequiments) {
    console.log(allRequiments);
    for (const require of allRequiments) {
      if (require.status !== 'Draft') {
        this.allRequirements.push(require);
      }
    }
    for (const sub of this.allRequirements) {
      const submission = _.findWhere(sub.submissions, { submissionId: this.submissionId });
      if (submission !== undefined) {
        this.selectedSubmission = submission;
      }
    }
    this.selectedRequirement = _.findWhere(this.allRequirements, { requirementId: this.selectedSubmission.requirementId });
    console.log(this.selectedRequirement);
    console.log(this.selectedSubmission);
    if (this.selectedSubmission.status === 'REJECTED') {
      this.isRejected = true;
    }
    // if (this.selectedSubmission.approvedByAdmin === true) {
    //   this.sendToClient = true;
    // } else {
    //   this.sendToClient = false;
    // }
    // if (this.selectedSubmission.clientSubmissionOn === 0) {
    //   this.isSubmitToClient = true;
    // } else {
    //   this.isSubmitToClient = false;
    // }
    if (this.selectedSubmission.candidate.c2C) {
      this.myForm.controls.c2c.setValue('Yes');
      this.isC2c = true;
    } else {
      this.myForm.controls.c2c.setValue('No');
    }
    if (this.selectedSubmission.candidate.relocate) {
      this.myForm.controls.editRelocate.setValue('true');
      this.isRelocate = true;
    } else {
      this.myForm.controls.editRelocate.setValue('false');
      this.isRelocate = false;
    }
    if (this.selectedSubmission.candidate.workedWithClient) {
      this.myForm.controls.editWorkedWithClient.setValue('true');
      this.isWorkedWithClient = true;
    } else {
      this.myForm.controls.editWorkedWithClient.setValue('false');
      this.isWorkedWithClient = false;
    }
    for (const recruiter of this.selectedRequirement.clientRecuriters) {
      this.recruiterName.push(recruiter.name + ' ');
      this.recruiterEmail.push(recruiter.email + ' ');
    }
    this.clientRecruiterName = this.recruiterName.join();
    this.clientRecruiterEmail = this.recruiterEmail.join();

    const immigiration = this.selectedSubmission.candidate.immigirationStatus;
    if (immigiration === 'GC') {
      this.myForm.controls.candidateImmigirationStatus.setValue('GC');
    } else if (immigiration === 'CITIZEN') {
      this.myForm.controls.candidateImmigirationStatus.setValue('CITIZEN');
    } else if (immigiration === 'H1B') {
      this.myForm.controls.candidateImmigirationStatus.setValue('H1B');
    } else if (immigiration === 'W2/1099') {
      this.myForm.controls.candidateImmigirationStatus.setValue('W2/1099');
    } else if (immigiration === 'OPT/CPT') {
      this.myForm.controls.candidateImmigirationStatus.setValue('OPT/CPT');
    } else if (immigiration === 'EAD') {
      this.myForm.controls.candidateImmigirationStatus.setValue('EAD');
    } else if (immigiration === 'H4AD') {
      this.myForm.controls.candidateImmigirationStatus.setValue('H4AD');
    }

  }

}
