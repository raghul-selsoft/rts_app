import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LoggedUserService } from '../Services/logged-user.service';
import { RequirementsService } from '../Services/requirements.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../Services/user.service';
import { ClientService } from '../Services/client.service';

@Component({
  selector: 'app-add-new-requirement',
  templateUrl: './add-new-requirement.component.html',
  styleUrls: ['./add-new-requirement.component.css'],
  providers: [LoggedUserService]
})
export class AddNewRequirementComponent implements OnInit {

  public myForm: FormGroup;
  rtsUser: any;
  rtsUserId: any;
  requirementType: any;
  userDetails: any;
  newRequirement: any;
  requirementByUser: any;
  rtsCompanyId: any;
  clients: any;

  constructor(
    private loggedUser: LoggedUserService,
    private requirementService: RequirementsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private clientService: ClientService
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.rtsCompanyId = this.rtsUser.companyId;
    this.requirementByUser = [];
    this.requirementType = [
      { 'name': 'C2C', 'value': 'c2c' },
      { 'name': 'FTE', 'value': 'fte' },
      { 'name': 'TBD', 'value': 'tbd' }
    ];
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      positionName: ['', Validators.required],
      clientName: [''],
      accountName: [''],
      status: [''],
      bankName: ['', Validators.required],
      priority: [''],
      location: [''],
      requirementType: ['', Validators.required],
      positionsCount: [''],
      immigrationRequirement: [''],
      allocation: [''],
      team: [''],
      comments: [''],
    });
    this.getAllUsers();
    this.getAllClients();
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

  getCheckedValue(event) {
    console.log(event);
    if (event !== undefined) {
      if (this.requirementByUser.indexOf(event) === -1) {
        this.requirementByUser.push(event);
      }
    }
    console.log(this.requirementByUser);
  }

  addNewRequirement(form: FormGroup) {
    console.log(form.value.requirementType);

    if (form.value.allocation === '') {
      const requirement = {
        positionName: form.value.positionName,
        accountName: form.value.accountName,
        priority: form.value.priority,
        location: form.value.location,
        requirementType: [
        ],
        positionCount: form.value.positionsCount,
        status: form.value.status,
        enteredBy: this.rtsUserId,
        clientId: form.value.clientName
      };
      this.newRequirement = requirement;
    } else {
      const requirement = {
        positionName: form.value.positionName,
        accountName: form.value.accountName,
        priority: form.value.priority,
        location: form.value.location,
        requirementType: [
        ],
        positionCount: form.value.positionsCount,
        status: form.value.status,
        enteredBy: this.rtsUserId,
        clientId: form.value.clientName,
        allocationUserId: form.value.allocation
      };
      this.newRequirement = requirement;
    }
    console.log(this.newRequirement);

    this.requirementService.addRequirements(this.newRequirement)
      .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this.toastr.success('New requirement successfully added', '', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
            this.router.navigate(['requirements']);

          } else {
            this.toastr.error(data.message, '', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
          }
        });
  }

}
