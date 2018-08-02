import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoggedUserService } from '../Services/logged-user.service';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css'],
  providers: [LoggedUserService]
})
export class AddTeamComponent implements OnInit {

  private userType: any;
  private rtsUser: any;
  private rtsUserId: any;

  public myForm: FormGroup;
  private users: any;
  private teamMembers: any;
  private otherUsers: any;
  constructor(
    private loggedUser: LoggedUserService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.teamMembers = [];
    this.otherUsers = [];
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      teamName: [''],
      teamLeadUser: [''],
      teamMembers: [''],
    });
    this.getAllUser();
  }

  getAllUser() {
    const userId = {
      enteredBy: this.rtsUserId
    };

    this.userService.allUsers(userId)
      .subscribe(
        data => {
          if (data.success) {
            this.users = data.users;
          }
        });
  }

  getTeamMembers(event) {
    this.otherUsers = [];
    for (const user of this.users) {
      if (user.userId !== event) {
        this.otherUsers.push(user);
      }
    }
  }

  addNewTeam(form: FormGroup) {

    const team = {
      teamName: form.value.teamName,
      leadUserId: form.value.teamLeadUser,
      otherUsers: this.teamMembers
    };
    console.log(team);
  }

}
