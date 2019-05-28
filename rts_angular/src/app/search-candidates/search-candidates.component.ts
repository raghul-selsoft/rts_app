import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { NgProgress } from 'ngx-progressbar';
import * as _ from 'underscore';
import { RequirementsService } from '../Services/requirements.service';
import { SendMailComponent } from '../send-mail/send-mail.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-candidates',
  templateUrl: './search-candidates.component.html',
  styleUrls: ['./search-candidates.component.css'],
  providers: [LoggedUserService]
})
export class SearchCandidatesComponent implements OnInit {

  selected: any[];
  candidates: any[];
  selectedCandidates: any[];
  rtsUserId: any;
  technologies: any;
  rtsUser: any;
  candidateLength: number;

  constructor(
    private requirementService: RequirementsService,
    private loggedUser: LoggedUserService,
    private router: Router,
    private ngProgress: NgProgress
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.selected = [];
  }

  ngOnInit() {
    this.ngProgress.start();
    this.getCommonDetails();
    this.candidates = [
      {
        "name": "Raghul",
        "technologyName": "WinAutomation",
        "technologyId": "5b672ed4c2b46a27f41f2873",
        "email":"raghul@selsoftinc.com"
      },
      {
        "name": "saba",
        "technologyName": "iOS, xcode",
        "technologyId": "5b683e1ac2b46a63ddf115af",
        "email":"rathina@selsoftinc.com"
      },
      {
        "name": "rathina",
        "technologyName": "Android",
        "technologyId": "5b686777c2b46a63ddf115b4",
        "email":"raghul@selsoftinc.com"
      },
      {
        "name": "rajesh",
        "technologyName": "Java Developer",
        "technologyId": "5b6874c2c2b46a63ddf115b8",
        "email":"rajesh@sel.com"
      },
      {
        "name": "Kumar",
        "technologyName": "Full Stack update",
        "technologyId": "5b7a683bc2b46a0d6867e7af",
        "email":"kumar@sel.com"
      },
      {
        "name": "Vishnu",
        "technologyName": "SAP",
        "technologyId": "5b688361c2b46a63ddf115bc",
        "email":"vishnu@sel.com"
      },
    ]
  }

  getCommonDetails() {
    const companyId = {
      userId: this.rtsUserId
    };

    this.requirementService.commonDetails(companyId)
      .subscribe(
        data => {
          if (data.success) {
            this.technologies = data.technologies;
            this.ngProgress.done();
          }
        });
  }

  getTech() {
    this.selectedCandidates = [];
    for (const techId of this.selected) {
      const candidate = _.findWhere(this.candidates, { technologyId: techId })
      if (candidate !== undefined) {
        this.selectedCandidates.push(candidate);
      }
    }
    this.candidateLength = this.selectedCandidates.length;
    console.log(this.selectedCandidates);

  }

  sendMail() {
    SendMailComponent.candidatesList = this.selectedCandidates;
    this.router.navigate(['/send-mail']);
  }



}
