import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';

@Component({
  selector: 'app-manage-candidate',
  templateUrl: './manage-candidate.component.html',
  styleUrls: ['./manage-candidate.component.css'],
  providers: [LoggedUserService]
})
export class ManageCandidateComponent implements OnInit {

  private userType: any;
  private rtsUser: any;
  private rtsUserId: any;
  private rtsCompanyId: any;
  private candidates: any;
  private candidateLength: any;

  constructor() { }

  ngOnInit() {
  }

}
