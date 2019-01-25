import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { HideComponentService } from '../Services/hide-component.service';
import { SubmissionService } from '../Services/submission.service';
import { Sort } from '@angular/material';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-joining-date',
  templateUrl: './joining-date.component.html',
  styleUrls: ['./joining-date.component.css'],
  providers: [LoggedUserService]
})
export class JoiningDateComponent implements OnInit {

  private rtsUser: any;
  private rtsUserId: any;
  sortedData: any[];

  constructor(
    private loggedUser: LoggedUserService,
    private submissonService: SubmissionService,
    private hideComponent: HideComponentService,
    private ngProgress: NgProgress
  ) {
    this.hideComponent.displayComponent = true;
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;

  }

  ngOnInit() {
    this.ngProgress.start();
  }

}
