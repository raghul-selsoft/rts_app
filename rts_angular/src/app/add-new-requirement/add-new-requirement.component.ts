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
  private rtsUser: any;
  private rtsUserId: any;
  private requirementType: any;
  private userDetails: any;
  private newRequirement: any;
  private requirementByUser: any;
  private immigrationByUser: any;
  private rtsCompanyId: any;
  private clients: any;
  private immigration: any;
  private teams: any;
  private requirementStatus: any;
  private positions: any;
  private accounts: any;
  private isOtherAccountName: boolean;

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
    this.immigrationByUser = [];
    this.requirementType = ['C2C', 'FTE', 'TBD'];
    this.immigration = ['GC', 'CITIZEN', 'H1B'];
    this.requirementStatus = [
      { 'name': 'Open', 'value': 'open' },
      { 'name': 'In-Progress', 'value': 'inprogress' },
      { 'name': 'Closed', 'value': 'closed' }
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
      clientRate: [''],
      sellingRate: [''],
      jobDescription: [''],
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

    this.userService.allUsers(userId)
      .subscribe(
        data => {
          if (data.success) {
            this.userDetails = data.users;
          }
        });

  }

  getCheckedRequirementType(type) {
    if (this.requirementByUser.indexOf(type) === -1) {
      this.requirementByUser.push(type);
    } else {
      this.requirementByUser.splice(this.requirementByUser.indexOf(type), 1);
    }
    console.log(this.requirementByUser);
  }

  getCheckedImmigrationValue(data) {
    if (this.immigrationByUser.indexOf(data) === -1) {
      this.immigrationByUser.push(data);
    } else {
      this.immigrationByUser.splice(this.immigrationByUser.indexOf(data), 1);
    }
    console.log(this.immigrationByUser);
  }

  changeAccountName(event) {
    if (event === 'other') {
      this.isOtherAccountName = true;
    } else {
      this.isOtherAccountName = false;
    }
  }

  addNewRequirement(form: FormGroup) {

    // if (form.value.allocation === '') {
    //   const requirement = {
    //     positionName: form.value.positionName,
    //     accountName: form.value.accountName,
    //     priority: form.value.priority,
    //     location: form.value.location,
    //     requirementType: [
    //     ],
    //     positionCount: form.value.positionsCount,
    //     status: form.value.status,
    //     enteredBy: this.rtsUserId,
    //     clientId: form.value.clientName
    //   };
    //   this.newRequirement = requirement;
    // } else {
    const requirement = {
      positionName: form.value.positionName,
      accountName: form.value.accountName,
      priority: form.value.priority,
      location: form.value.location,
      requirementType: [this.requirementByUser],
      immigrationRequirement: [this.immigrationByUser],
      positionCount: form.value.positionsCount,
      status: form.value.status,
      enteredBy: this.rtsUserId,
      clientId: form.value.clientName,
      allocationUserId: form.value.allocation,
      clientRate: form.value.clientRate,
      sellingRate: form.value.sellingRate,
      jobDescription: form.value.jobDescription,
    };
    this.newRequirement = requirement;
    // }
    console.log(this.newRequirement);

    // this.requirementService.addRequirements(this.newRequirement)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       if (data.success) {
    //         this.toastr.success('New requirement successfully added', '', {
    //           positionClass: 'toast-top-center',
    //           timeOut: 3000,
    //         });
    //         this.router.navigate(['requirements']);

    //       } else {
    //         this.toastr.error(data.message, '', {
    //           positionClass: 'toast-top-center',
    //           timeOut: 3000,
    //         });
    //       }
    //     });
  }

}
