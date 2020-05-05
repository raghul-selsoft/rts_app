import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { MatDialogRef } from '@angular/material';
import { NgProgress } from 'ngx-progressbar';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-dice-link',
  templateUrl: './view-dice-link.component.html',
  styleUrls: ['./view-dice-link.component.css'],
  providers: [LoggedUserService]
})
export class ViewDiceLinkComponent implements OnInit {
  rtsUser: any;
  rtsUserId: any;
  rtsCompanyId: any;
  link: any;
  id: any;


  constructor(
    public dialogRef: MatDialogRef<ViewDiceLinkComponent>,
    private loggedUser: LoggedUserService,
    private ngProgress: NgProgress,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.rtsCompanyId = this.rtsUser.companyId;
  }

  ngOnInit() {
  }

  openLink() {
    var link = this.link;
    // this.router.navigate(['dice-detail-view', id]);
    if (link.length > 30) {
      this.id = link.substr(47,40);
      var id = link.substr(46, 40);
      // console.log(id);
      // window.open('dice-detail-view'+id);
      this.router.navigate(['dice-detail-view',id]);
    }
  }
}
