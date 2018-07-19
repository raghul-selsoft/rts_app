import { Component, OnInit } from '@angular/core';
import { RequirementsService } from '../Services/requirements.service';
import { LoggedUserService } from '../Services/logged-user.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../Services/user.service';
import { ClientService } from '../Services/client.service';

@Component({
  selector: 'app-edit-requirement',
  templateUrl: './edit-requirement.component.html',
  styleUrls: ['./edit-requirement.component.css'],
  providers: [LoggedUserService]
})
export class EditRequirementComponent implements OnInit {

  rtsUser: any;
  rtsUserId: any;
  requirementId: any;
  requirements: any;
  selectedRequirement: any;
  requirementCreatedDate: any;
  userDetails: any;
  rtsCompanyId: any;
  clients: any;

  public myForm: FormGroup;

  constructor(private loggedUser: LoggedUserService,
    private requirementService: RequirementsService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.rtsCompanyId = this.rtsUser.companyId;
    this.selectedRequirement = {};
  }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.requirementId = params['id'];
      });

    this.myForm = this.formBuilder.group({
      createdDate: ['', [Validators.required, Validators.minLength(3)]],
      positionName: ['', Validators.required],
      status: [''],
      clientName: [''],
      accountName: [''],
      bankName: ['', Validators.required],
      priority: [''],
      location: [''],
      requirementType: ['', Validators.required],
      positionsCount: [''],
      immigrationRequirement: [''],
      clientContactName: [''],
      clientContactEmail: ['', Validators.required],
      allocation: [''],
      team: [''],
      comments: [''],
    });
    this.getAllRequirements();
    this.getAllUsers();
    this.getAllClients();
  }

  getAllRequirements() {

    const userId = {
      companyId: this.rtsCompanyId
    };

    this.requirementService.requirementsDetails(userId)
      .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this.requirements = data.requirements;
            this.selectedRequirement = _.findWhere(this.requirements, { requirementId: this.requirementId });
            this.requirementCreatedDate = moment(this.selectedRequirement.createdOn).format('MMM D, Y');
            console.log(this.selectedRequirement);
          }
        });
  }

  getAllUsers() {
    const userId = {
      enteredBy: this.rtsUserId
    };

    console.log(userId);
    this.userService.allUsers(userId)
      .subscribe(
        data => {
          if (data.success) {
            this.userDetails = data.users;
          }
        });

  }

  getAllClients() {
    const companyId = {
      companyId: this.rtsCompanyId
    };

    this.clientService.allClients(companyId)
      .subscribe(
        data => {
          if (data.success) {
            this.clients = data.clients;
          }
        });

  }

  updateRequirement(form: FormGroup) {
    console.log(form.value);
  }

}
