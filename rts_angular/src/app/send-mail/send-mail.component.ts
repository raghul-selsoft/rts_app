import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { NgProgress } from 'ngx-progressbar';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css'],
  providers: [LoggedUserService]
})
export class SendMailComponent implements OnInit {

  public myForm: FormGroup;
  static mailToAddress: any[];
  rtsUserId: any;
  rtsUser: any;
  adminUsers: any[];
  customMailBody: any;
  selectedAdmins: any[];
  rtsCompanyId: any;
  adminUsersArray: any;
  users: any;
  rtsUserEmail: any;
  selectedMailId: any[];
  mailToAddress: any;

  constructor(
    private loggedUser: LoggedUserService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private ngProgress: NgProgress,
    private toastr: ToastrService,
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.rtsCompanyId = this.rtsUser.companyId;
    this.rtsUserEmail = this.rtsUser.email;
    this.adminUsers = [];
    this.customMailBody = '';
    this.selectedAdmins = [];
    this.adminUsersArray = [];
    this.users = [];
    this.selectedMailId = [];
    this.mailToAddress = [];
  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      mailFrom: [''],
      mailTo: [''],
      mailCC: [''],
      mailBody: [''],
      mailSubject: ['']
    })
    this.getAllUser();

    if (SendMailComponent.mailToAddress !== undefined) {
      for (const mail of SendMailComponent.mailToAddress) {
        this.selectedMailId.push({ email: mail.email });
        this.mailToAddress.push(mail.email)
      }
    }
    // this.customMailBody = '<p><b>Employee Name :</b> R Raghul</p>';


  }

  getAllUser() {
    const userId = {
      companyId: this.rtsCompanyId
    };

    this.userService.allUsers(userId)
      .subscribe(
        data => {
          if (data.success) {
            this.adminUsers = [];
            this.users = data.users;
            for (const user of this.users) {
              if (user.role === 'ADMIN') {
                this.adminUsers.push({ email: user.email, name: user.firstName + ' ' + user.lastName });
              }
            }
            // this.adminUsersArray = [{ email: 'pushban@selsoftinc.com', name: 'Pushban R' }];
          }
        });
  }

  copied(event) {
    this.toastr.info('Text Copied', '', {
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
    });
  }

  sendMail(form: FormGroup) {
    console.log(form.value);
  }

}
