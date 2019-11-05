import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import * as moment from 'moment';
import { DiceService } from '../Services/dice.service';

@Component({
  selector: 'app-choose-dice-account',
  templateUrl: './choose-dice-account.component.html',
  styleUrls: ['./choose-dice-account.component.css'],
  providers: [LoggedUserService]
})
export class ChooseDiceAccountComponent implements OnInit {
  rtsUser: any;
  rtsUserId: any;
  userRole: any;
  rtsCompanyId: any;
  diceAccount: any;

  constructor(
    private loggedUser: LoggedUserService,
    private formBuilder: FormBuilder,
    private ngProgress: NgProgress,
    private toastr: ToastrService,
    private diceService: DiceService,
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.userRole = this.rtsUser.role;
    this.rtsCompanyId = this.rtsUser.companyId;
  }

  ngOnInit() {
    this.getAllDiceAccount();
  }

  getAllDiceAccount() {
    const companyId = {
      companyId: this.rtsCompanyId
    };

    this.diceService.getAllDice(companyId)
      .subscribe(
        data => {
          if (data.success) {
            this.diceAccount = data.diceInfo;
          }
        });
  }

}
