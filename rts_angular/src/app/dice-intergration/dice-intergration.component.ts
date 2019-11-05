import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import * as moment from 'moment';
import { PageEvent } from '@angular/material';
import { DiceService } from '../Services/dice.service';
import { RequirementsService } from '../Services/requirements.service';

@Component({
  selector: 'app-dice-intergration',
  templateUrl: './dice-intergration.component.html',
  styleUrls: ['./dice-intergration.component.css'],
  providers: [LoggedUserService]
})
export class DiceIntergrationComponent implements OnInit {

  lowValue: number = 0;
  highValue: number = 10;

  public myForm: FormGroup;
  public candidateForm: FormGroup;
  rtsUser: any;
  rtsUserId: any;
  rtsCompanyId: any;
  candidates: any;
  candidatesLength: any;
  userRole: any;
  diceAccount: any;
  selectedDice: any;
  contactMethod: any[];
  selectedSkills: any[];
  skills: any;
  educationDegree: { "name": string; "value": string; }[];
  immigration: any;
  diceCandidates: any;

  constructor(
    private loggedUser: LoggedUserService,
    private requirementService: RequirementsService,
    private formBuilder: FormBuilder,
    private ngProgress: NgProgress,
    private toastr: ToastrService,
    private diceService: DiceService
  ) {
    this.rtsUser = JSON.parse(this.loggedUser.loggedUser);
    this.rtsUserId = this.rtsUser.userId;
    this.userRole = this.rtsUser.role;
    this.rtsCompanyId = this.rtsUser.companyId;
    this.candidates = [];
    this.skills = [];
    this.selectedSkills = [];
    this.immigration = [];
    this.diceCandidates = {};
  }

  ngOnInit() {
    // this.ngProgress.start();

    this.myForm = this.formBuilder.group({
      query: [''],
      skills: [''],
      location: [''],
      experience: [''],
      workPermit: [''],
      employmentType: ['']
    })
    this.candidateForm = this.formBuilder.group({
      distance: [''],
      lastActive: [''],
      contactMethod: [''],
      relocate: [''],
      skills: [''],
      experience: [''],
      employmentType: [''],
      education: [''],
      workPermit: [''],
      pageSize: [''],
    })
    this.getAllDiceAccount();
    this.getAllSkills();
    this.getAllCommonData();
    this.contactMethod = [{ "name": "Email", "value": "isEmail" }, { "name": "Phone", "value": "isPhone" }];

    this.educationDegree = [
      { "name": "Bechelors", "value": "Bechelors" },
      { "name": "Masters", "value": "Masters" },
      { "name": "MBA", "value": "MBA" },
      { "name": "Associate", "value": "Associate" },
      { "name": "High School", "value": "High School" },
      { "name": "Vocational School", "value": "vocational School" }];


    this.diceCandidates = {
      "data": [
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T12:14:51Z",
            "lastName": "Javafullstack",
            "city": "New York",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Liaison internationals LLC",
                    "location": "Buffalo NY United States",
                    "title": "Sr. Java/ J2EE Developer",
                    "periodStart": {
                        "month": 11,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Liaison internationals LLC",
                        "location": "Buffalo NY United States",
                        "title": "Sr. Java/ J2EE Developer",
                        "periodStart": {
                            "month": 11,
                            "year": 2018
                        }
                    },
                    {
                        "location": "Brea CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        },
                        "periodEnd": {
                            "month": 10,
                            "year": 2018
                        }
                    },
                    {
                        "org": "Putnam Investments",
                        "location": "Boston MA United States",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 2,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "org": "ITC Infotech",
                        "location": "India",
                        "title": "Java/J2EE Developer",
                        "periodStart": {
                            "month": 12,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 1,
                            "year": 2016
                        }
                    },
                    {
                        "org": "SIFY Technologies",
                        "location": "Hyderabad India",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 8,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 11,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "css"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "junit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "ui"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "agile"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "hibernate"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "jira"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "spring"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "implementation"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "restful"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "j2ee"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "mockito"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "dependency injection"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "eclipse"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr. Java/ J2EE Developer",
            "id": "2d058d8d1d4a48482e8ae7c30888cee8a40e70c7",
            "dateResumeLastUpdated": "2019-11-05T10:49:55Z",
            "workPreferences": [
                {
                    "annualSalary": {
                        "min": 130000,
                        "max": 0,
                        "currency": "USD"
                    },
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                },
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ],
                    "hourlyRate": {
                        "min": 65,
                        "max": 0,
                        "currency": "USD"
                    }
                }
            ],
            "languages": [],
            "currentCompany": "Liaison internationals LLC",
            "legacyIds": [
                "9d097c69d98852237cffdfd6a677fe34"
            ],
            "fullName": "Varun Javafullstack",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Java/ J2EE Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Varun",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "New York",
                    "countryCode": "US",
                    "latitude": 40.75369,
                    "source": "dice",
                    "text": "New York, New York US",
                    "region": "New York",
                    "longitude": -73.99916
                }
            ],
            "region": "New York",
            "securityAllowance": {
                "status": true
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T12:10:32Z",
            "lastName": "Dotnet",
            "city": "Allenton",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "location": "MD United States",
                    "title": "Sr.NET Developer",
                    "periodStart": {
                        "month": 10,
                        "year": 2017
                    }
                },
                "history": [
                    {
                        "location": "MD United States",
                        "title": "Sr.NET Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2017
                        }
                    },
                    {
                        "org": "Omnicare",
                        "location": "Cincinnati Ohio United States",
                        "periodStart": {
                            "month": 1,
                            "year": 2017
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2017
                        }
                    },
                    {
                        "org": "Liberty Mutual",
                        "location": "Indianapolis Indiana United States",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2016
                        }
                    },
                    {
                        "org": "All State Insurance",
                        "location": "Northbrook IL United States",
                        "title": "NET Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Aeon Telectronics Pvt Ltd",
                        "periodStart": {
                            "month": 2,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "asp.net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "c#"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "microsoft sql server"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "microsoft visual studio"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "stored procedures"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "unit testing"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "microsoft tfs"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "css"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "entity framework"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "jquery"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "wcf"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "microsoft iis"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "ajax"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 5,
                    "skill": "ui"
                },
                {
                    "lastUsed": 2016,
                    "yearsUsed": 5,
                    "skill": "webforms"
                },
                {
                    "score": 15,
                    "skill": "iis"
                },
                {
                    "score": 15,
                    "skill": "tfs"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr.NET Developer",
            "id": "da2df79fe35123a46217b7e7925fd8cf7a4bba55",
            "dateResumeLastUpdated": "2019-11-05T12:08:34Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "legacyIds": [
                "47bb7dc9d4000629561adcf09ddad766"
            ],
            "fullName": "Sunil Dotnet",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr.NET Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Sunil",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Allenton",
                    "countryCode": "US",
                    "latitude": 42.91947,
                    "source": "dice",
                    "text": "Allenton, Michigan US",
                    "region": "Michigan",
                    "longitude": -82.94549
                }
            ],
            "region": "Michigan",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T12:10:14Z",
            "lastName": "Javafullstack",
            "city": "Oklahoma City",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Petco Animal Supplies, Inc",
                    "location": "CA United States",
                    "title": "Sr. Java Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Petco Animal Supplies, Inc",
                        "location": "CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "org": "S.P",
                        "location": "Richards GA United States",
                        "title": "Sr. Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Nissan CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 7,
                            "year": 2016
                        }
                    },
                    {
                        "location": "India",
                        "title": "Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "People Tech Group",
                        "location": "India",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "junit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "api"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "git"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "j2ee"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "json"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "soap"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "software deployment"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "restful"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "mockito"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "spring"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "apache struts"
                },
                {
                    "score": 15,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "struts"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 6,
            "currentJobTitle": "Sr. Java Developer",
            "id": "9c6202106b067f4e4d764925b630319336fae94a",
            "dateResumeLastUpdated": "2019-11-05T12:08:02Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Petco Animal Supplies, Inc",
            "legacyIds": [
                "0f16433694d251d68ee325a93b65ef26"
            ],
            "fullName": "Akshay Javafullstack",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Java Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Akshay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Oklahoma City",
                    "countryCode": "US",
                    "latitude": 35.47,
                    "source": "dice",
                    "text": "Oklahoma City, Oklahoma US",
                    "region": "Oklahoma",
                    "longitude": -97.52
                }
            ],
            "region": "Oklahoma",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T12:10:06Z",
            "lastName": "Javafullstack",
            "city": "Atlanta",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Petco Animal Supplies, Inc",
                    "location": "CA United States",
                    "title": "Sr. Java Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Petco Animal Supplies, Inc",
                        "location": "CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "org": "S.P",
                        "location": "Richards GA United States",
                        "title": "Sr. Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Nissan CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 7,
                            "year": 2016
                        }
                    },
                    {
                        "location": "India",
                        "title": "Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "People Tech Group",
                        "location": "India",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "junit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "api"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "git"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "j2ee"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "json"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "soap"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "software deployment"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "restful"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "mockito"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "spring"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "apache struts"
                },
                {
                    "score": 15,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "struts"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 6,
            "currentJobTitle": "Sr. Java Developer",
            "id": "17d8841eec9e143e56208d294ee3f56054b8c7d8",
            "dateResumeLastUpdated": "2019-11-05T12:07:48Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Petco Animal Supplies, Inc",
            "legacyIds": [
                "46fffc5d64c223cb1400d738fb3b8c84"
            ],
            "fullName": "Akshay Javafullstack",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Java Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Akshay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Atlanta",
                    "countryCode": "US",
                    "latitude": 33.76,
                    "source": "dice",
                    "text": "Atlanta, Georgia US",
                    "region": "Georgia",
                    "longitude": -84.39
                }
            ],
            "region": "Georgia",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "priorJobTitle": "Senior UI Developer",
            "dateLastActive": "2019-11-05T12:08:41Z",
            "lastName": "UI",
            "city": "Bridgeport",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Cardinal Health",
                    "location": "Dublin OH United States",
                    "title": "Senior UI Developer",
                    "periodStart": {
                        "month": 3,
                        "year": 2019
                    }
                },
                "history": [
                    {
                        "org": "Cardinal Health",
                        "location": "Dublin OH United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 3,
                            "year": 2019
                        }
                    },
                    {
                        "org": "Bridgestone Americas",
                        "location": "Nashville TN United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 3,
                            "year": 2018
                        }
                    },
                    {
                        "org": "Election Systems & Software",
                        "location": "Omaha NE United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 3,
                            "year": 2017
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2018
                        }
                    },
                    {
                        "org": "Optum",
                        "location": "Eden Prairie MN United States",
                        "title": "OCM- OPTUM Clinical Manager",
                        "periodStart": {
                            "month": 7,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2017
                        }
                    },
                    {
                        "org": "PayPal",
                        "location": "San Jose CA United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 6,
                            "year": 2016
                        }
                    },
                    {
                        "org": "BNSF Railways",
                        "location": "Dallas TX United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "location": "MI United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 3,
                            "year": 2014
                        },
                        "periodEnd": {
                            "year": 2014
                        }
                    },
                    {
                        "org": "Geisinger Health Systems",
                        "location": "Danville PA United States",
                        "title": "UI Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2014
                        }
                    },
                    {
                        "org": "Carnegie Learning",
                        "location": "Pittsburgh PA United States",
                        "title": "UI Developer",
                        "periodStart": {
                            "month": 4,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2012
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "ui"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "css"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "angularjs"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "ups"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "agile"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "unit testing"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "ux"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "spa"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "ajax"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "html"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "jquery"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "json"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "media"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "responsive design"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 4,
                    "skill": "bootstrap"
                },
                {
                    "score": 15,
                    "skill": "css javascript"
                }
            ],
            "hasEmail": true,
            "priorCompany": "Bridgestone Americas",
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Senior UI Developer",
            "id": "08ba28d63f35cf46a3c5834b89da4233d763c663",
            "dateResumeLastUpdated": "2019-11-05T12:07:49Z",
            "workPreferences": [
                {
                    "willingToRelocate": false,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Cardinal Health",
            "legacyIds": [
                "ecf6eda2d9b9d4c5e521001e53f41279"
            ],
            "fullName": "Sai UI",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Senior UI Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Sai",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Bridgeport",
                    "countryCode": "US",
                    "latitude": 41.18006,
                    "source": "dice",
                    "text": "Bridgeport, Connecticut US",
                    "region": "Connecticut",
                    "longitude": -73.18839
                }
            ],
            "region": "Connecticut",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "priorJobTitle": "Senior UI Developer",
            "dateLastActive": "2019-11-05T12:04:11Z",
            "lastName": "UI",
            "city": "Hoboken",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Cardinal Health",
                    "location": "Dublin OH United States",
                    "title": "Senior UI Developer",
                    "periodStart": {
                        "month": 3,
                        "year": 2019
                    }
                },
                "history": [
                    {
                        "org": "Cardinal Health",
                        "location": "Dublin OH United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 3,
                            "year": 2019
                        }
                    },
                    {
                        "org": "Bridgestone Americas",
                        "location": "Nashville TN United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 3,
                            "year": 2018
                        }
                    },
                    {
                        "org": "Election Systems & Software",
                        "location": "Omaha NE United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 3,
                            "year": 2017
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2018
                        }
                    },
                    {
                        "org": "Optum",
                        "location": "Eden Prairie MN United States",
                        "title": "OCM- OPTUM Clinical Manager",
                        "periodStart": {
                            "month": 7,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2017
                        }
                    },
                    {
                        "org": "PayPal",
                        "location": "San Jose CA United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 6,
                            "year": 2016
                        }
                    },
                    {
                        "org": "BNSF Railways",
                        "location": "Dallas TX United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "location": "MI United States",
                        "title": "Senior UI Developer",
                        "periodStart": {
                            "month": 3,
                            "year": 2014
                        },
                        "periodEnd": {
                            "year": 2014
                        }
                    },
                    {
                        "org": "Geisinger Health Systems",
                        "location": "Danville PA United States",
                        "title": "UI Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2014
                        }
                    },
                    {
                        "org": "Carnegie Learning",
                        "location": "Pittsburgh PA United States",
                        "title": "UI Developer",
                        "periodStart": {
                            "month": 4,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2012
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "ui"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "css"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "angularjs"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "ups"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "agile"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "unit testing"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "ux"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "spa"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "ajax"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "html"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "jquery"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "json"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "media"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "responsive design"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 4,
                    "skill": "bootstrap"
                },
                {
                    "score": 15,
                    "skill": "css javascript"
                }
            ],
            "hasEmail": true,
            "priorCompany": "Bridgestone Americas",
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Senior UI Developer",
            "id": "e97ec7ffaf7ac2be5896db69a3a1d9957040a1ac",
            "dateResumeLastUpdated": "2019-11-05T12:03:03Z",
            "workPreferences": [
                {
                    "willingToRelocate": false,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Cardinal Health",
            "legacyIds": [
                "5f3a2327d39f376a4a5c046543462565"
            ],
            "fullName": "Sai UI",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Senior UI Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Sai",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Hoboken",
                    "countryCode": "US",
                    "latitude": 40.74405,
                    "source": "dice",
                    "text": "Hoboken, New Jersey US",
                    "region": "New Jersey",
                    "longitude": -74.02707
                }
            ],
            "region": "New Jersey",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T12:04:06Z",
            "lastName": "Javafullstack",
            "city": "Charlotte",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Petco Animal Supplies, Inc",
                    "location": "CA United States",
                    "title": "Sr. Java Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Petco Animal Supplies, Inc",
                        "location": "CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "org": "S.P",
                        "location": "Richards GA United States",
                        "title": "Sr. Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Nissan CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 7,
                            "year": 2016
                        }
                    },
                    {
                        "location": "India",
                        "title": "Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "People Tech Group",
                        "location": "India",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "junit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "api"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "git"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "j2ee"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "json"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "soap"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "software deployment"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "restful"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "mockito"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "spring"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "apache struts"
                },
                {
                    "score": 15,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "struts"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 6,
            "currentJobTitle": "Sr. Java Developer",
            "id": "443cb89b567cec43ffb01771c6c98fc46ed461db",
            "dateResumeLastUpdated": "2019-11-05T12:01:56Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Petco Animal Supplies, Inc",
            "legacyIds": [
                "ac9739f6e23fd9afc7de036884adf6a2"
            ],
            "fullName": "Akshay Javafullstack",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Java Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Akshay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Charlotte",
                    "countryCode": "US",
                    "latitude": 35.22941,
                    "source": "dice",
                    "text": "Charlotte, North Carolina US",
                    "region": "North Carolina",
                    "longitude": -80.92473
                }
            ],
            "region": "North Carolina",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T12:03:44Z",
            "lastName": "Javafullstack",
            "city": "Cincinnati",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Petco Animal Supplies, Inc",
                    "location": "CA United States",
                    "title": "Sr. Java Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Petco Animal Supplies, Inc",
                        "location": "CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "org": "S.P",
                        "location": "Richards GA United States",
                        "title": "Sr. Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Nissan CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 7,
                            "year": 2016
                        }
                    },
                    {
                        "location": "India",
                        "title": "Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "People Tech Group",
                        "location": "India",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "junit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "api"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "git"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "j2ee"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "json"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "soap"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "software deployment"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "restful"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "mockito"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "spring"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "apache struts"
                },
                {
                    "score": 15,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "struts"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 6,
            "currentJobTitle": "Sr. Java Developer",
            "id": "257278553bdacb7ef6d781f0d8b497b7b776c666",
            "dateResumeLastUpdated": "2019-11-05T12:01:45Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Petco Animal Supplies, Inc",
            "legacyIds": [
                "1f2c62d96398181c29533b32a9a37b52"
            ],
            "fullName": "Akshay Javafullstack",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Java Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Akshay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Cincinnati",
                    "countryCode": "US",
                    "latitude": 39.17879,
                    "source": "dice",
                    "text": "Cincinnati, Ohio US",
                    "region": "Ohio",
                    "longitude": -84.51435
                }
            ],
            "region": "Ohio",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T12:03:20Z",
            "lastName": "Hadoop",
            "city": "Iowa City",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Blackrock",
                    "location": "Atlanta GA United States",
                    "title": "Sr. Hadoop Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Blackrock",
                        "location": "Atlanta GA United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "location": "Fort Lauderdale FL United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Tampa FL United States",
                        "title": "Hadoop Developer | Syniverse technologies",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Local bazaar Pvt. Ltd | India",
                        "title": "Hadoop/Java Developer",
                        "periodStart": {
                            "month": 2,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Sogeti | India",
                        "title": "SQL Developer",
                        "periodStart": {
                            "month": 7,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "apache hadoop"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "real-time"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "apache pig"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "cluster"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "mapreduce"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "rdbms"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "scala"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache flume"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hbase"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hive"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache kafka"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache oozie"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache spark"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache sqoop"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache storm"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "distributed file system"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "hdfs"
                },
                {
                    "score": 135,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "hadoop"
                },
                {
                    "score": 15,
                    "skill": "hbase"
                },
                {
                    "score": 15,
                    "skill": "hive"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr. Hadoop Developer",
            "id": "5dce75ef7554ca4a99ae8b58f11e9bb7b53c6795",
            "dateResumeLastUpdated": "2019-11-05T12:01:15Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Blackrock",
            "legacyIds": [
                "35ba2317c491bc0e74c297f70ee7eb28"
            ],
            "fullName": "Ashay Hadoop",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Hadoop Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Ashay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Iowa City",
                    "countryCode": "US",
                    "latitude": 41.66113,
                    "source": "dice",
                    "text": "Iowa City, Iowa US",
                    "region": "Iowa",
                    "longitude": -91.53017
                }
            ],
            "region": "Iowa",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:57:16Z",
            "lastName": "Hadoop",
            "city": "Atlanta",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Blackrock",
                    "location": "Atlanta GA United States",
                    "title": "Sr. Hadoop Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Blackrock",
                        "location": "Atlanta GA United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "location": "Fort Lauderdale FL United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Tampa FL United States",
                        "title": "Hadoop Developer | Syniverse technologies",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Local bazaar Pvt. Ltd | India",
                        "title": "Hadoop/Java Developer",
                        "periodStart": {
                            "month": 2,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Sogeti | India",
                        "title": "SQL Developer",
                        "periodStart": {
                            "month": 7,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "apache hadoop"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "real-time"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "apache pig"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "cluster"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "mapreduce"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "rdbms"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "scala"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache flume"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hbase"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hive"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache kafka"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache oozie"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache spark"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache sqoop"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache storm"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "distributed file system"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "hdfs"
                },
                {
                    "score": 135,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "hadoop"
                },
                {
                    "score": 15,
                    "skill": "hbase"
                },
                {
                    "score": 15,
                    "skill": "hive"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr. Hadoop Developer",
            "id": "3a3c9cbd7bb6a64b2c94282d6a6ebd3ee6bfc6bd",
            "dateResumeLastUpdated": "2019-11-05T11:53:25Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Blackrock",
            "legacyIds": [
                "aad7957e56106be5bec9738fc7d114cd"
            ],
            "fullName": "Ashay Hadoop",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Hadoop Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Ashay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Atlanta",
                    "countryCode": "US",
                    "latitude": 33.76,
                    "source": "dice",
                    "text": "Atlanta, Georgia US",
                    "region": "Georgia",
                    "longitude": -84.39
                }
            ],
            "region": "Georgia",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:56:18Z",
            "lastName": "Hadoop",
            "city": "Dallas",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Blackrock",
                    "location": "Atlanta GA United States",
                    "title": "Sr. Hadoop Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Blackrock",
                        "location": "Atlanta GA United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "location": "Fort Lauderdale FL United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Tampa FL United States",
                        "title": "Hadoop Developer | Syniverse technologies",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Local bazaar Pvt. Ltd | India",
                        "title": "Hadoop/Java Developer",
                        "periodStart": {
                            "month": 2,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Sogeti | India",
                        "title": "SQL Developer",
                        "periodStart": {
                            "month": 7,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "apache hadoop"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "real-time"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "apache pig"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "cluster"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "mapreduce"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "rdbms"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "scala"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache flume"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hbase"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hive"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache kafka"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache oozie"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache spark"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache sqoop"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache storm"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "distributed file system"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "hdfs"
                },
                {
                    "score": 135,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "hadoop"
                },
                {
                    "score": 15,
                    "skill": "hbase"
                },
                {
                    "score": 15,
                    "skill": "hive"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr. Hadoop Developer",
            "id": "7ecd50e5ab6c43b1c159f3084dafc0a2452b3faa",
            "dateResumeLastUpdated": "2019-11-05T11:54:19Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Blackrock",
            "legacyIds": [
                "3e64c829e20b663c11df7556483c7164"
            ],
            "fullName": "Ashay Hadoop",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Hadoop Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Ashay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Dallas",
                    "countryCode": "US",
                    "latitude": 32.78633,
                    "source": "dice",
                    "text": "Dallas, Texas US",
                    "region": "Texas",
                    "longitude": -96.79625
                }
            ],
            "region": "Texas",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:50:06Z",
            "lastName": "Childers",
            "education": [
                {
                    "org": "Kennesaw State University",
                    "degree": "Bachelors",
                    "location": "Marietta GA United States"
                }
            ],
            "city": "Atlanta",
            "likelyToMoveScore": 100,
            "experience": {
                "history": [
                    {
                        "org": "Kennesaw State University - College of Computing and Software Engineering",
                        "title": "Teaching Assistant & Tutor",
                        "periodStart": {
                            "month": 8,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 5,
                            "year": 2016
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "c#"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "microsoft visual studio"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "software development"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "github"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "mathematics"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "sdlc"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 2,
                    "skill": ".net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "linux"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 2,
                    "skill": "c/c++"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 2,
                    "skill": "java"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "amazon web services"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "project management"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "team leadership"
                },
                {
                    "lastUsed": 2018,
                    "yearsUsed": 1,
                    "skill": "google cloud platform (gcp)"
                },
                {
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "agile"
                },
                {
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "virtualbox"
                }
            ],
            "hasEmail": true,
            "isThirdParty": false,
            "yearsOfExperience": 4,
            "imageUrl": "https://cdn-assets.workdigital.co.uk/4d168f6c3619e639ecd68c5bd11d869c2f5efbeb",
            "id": "4d168f6c3619e639ecd68c5bd11d869c2f5efbeb",
            "dateResumeLastUpdated": "2019-11-05T10:20:13Z",
            "workPreferences": [
                {
                    "willingToRelocate": false,
                    "employmentType": [
                        "Full-time"
                    ]
                }
            ],
            "languages": [],
            "legacyIds": [
                "88f61c042e419c2ac86ea48d4d3675a3"
            ],
            "fullName": "Daniel Childers",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Software Engineer"
            ],
            "workPermitDocuments": [
                "US Citizenship"
            ],
            "firstName": "Daniel",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/linkedin.png",
                    "source": "Linkedin"
                },
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Atlanta",
                    "countryCode": "US",
                    "latitude": 33.99006,
                    "source": "dice",
                    "text": "Atlanta, Georgia US",
                    "region": "Georgia",
                    "longitude": -84.34369
                }
            ],
            "region": "Georgia",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:30:16Z",
            "lastName": "Cobb",
            "city": "New Port Richey",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Pemco World Air Services",
                    "title": "Software Developer",
                    "periodStart": {
                        "month": 8,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "BISK EDUCATION",
                        "location": "Tampa Florida United States",
                        "title": "Technical Support Representative",
                        "periodStart": {
                            "month": 1,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2017
                        }
                    },
                    {
                        "org": "SAINT LEO UNIVERSITY",
                        "location": "St Leo Florida United States",
                        "title": "Technical Support Representative",
                        "periodStart": {
                            "month": 1,
                            "year": 2010
                        },
                        "periodEnd": {
                            "month": 1,
                            "year": 2011
                        }
                    },
                    {
                        "org": "ANHEUSER BUSCH",
                        "location": "Tampa Florida United States",
                        "title": "Server",
                        "periodStart": {
                            "month": 1,
                            "year": 2005
                        },
                        "periodEnd": {
                            "month": 1,
                            "year": 2010
                        }
                    },
                    {
                        "org": "Pemco World Air Services",
                        "title": "Software Developer",
                        "periodStart": {
                            "month": 8,
                            "year": 2018
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "software development"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 2,
                    "skill": "compliance"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 2,
                    "skill": "ran"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 2,
                    "skill": "training"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 2,
                    "skill": "printers"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "ajax"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "git"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "json"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "mongodb"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "phpunit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "yii"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "statistics"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "jquery"
                },
                {
                    "lastUsed": 2018,
                    "yearsUsed": 1,
                    "skill": "bootstrap"
                },
                {
                    "lastUsed": 2018,
                    "yearsUsed": 1,
                    "skill": "d3.js"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "linux"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "mysql"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "php"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "technical support"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "web applications"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 6,
                    "skill": "apache http server"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 6,
                    "skill": "email"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 6,
                    "skill": "google chrome"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 6,
                    "skill": "monitoring"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 6,
                    "skill": "real-time"
                },
                {
                    "score": 15,
                    "yearsUsed": 9,
                    "skill": "customer service"
                },
                {
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "strategy"
                },
                {
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "debugging"
                },
                {
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "reporting"
                },
                {
                    "yearsUsed": 2,
                    "skill": "regular expression"
                },
                {
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "amazon web services"
                },
                {
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "policies and procedures"
                },
                {
                    "score": 15,
                    "yearsUsed": 1,
                    "skill": "troubleshooting"
                },
                {
                    "yearsUsed": 1,
                    "skill": "computer"
                },
                {
                    "yearsUsed": 1,
                    "skill": "desktop"
                },
                {
                    "score": 15,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "http"
                },
                {
                    "skill": "docker"
                }
            ],
            "hasEmail": true,
            "isThirdParty": false,
            "yearsOfExperience": 14,
            "currentJobTitle": "Software Developer",
            "id": "1cc8b1eb71db88be8dee9fe9f0f1da2f4d136821",
            "dateResumeLastUpdated": "2019-11-05T11:29:09Z",
            "workPreferences": [
                {
                    "annualSalary": {
                        "min": 75000,
                        "max": 0,
                        "currency": "USD"
                    },
                    "willingToRelocate": false,
                    "employmentType": [
                        "Full-time"
                    ]
                },
                {
                    "willingToRelocate": false,
                    "employmentType": [
                        "Full-time"
                    ],
                    "hourlyRate": {
                        "min": 18,
                        "max": 0,
                        "currency": "USD"
                    }
                }
            ],
            "languages": [],
            "currentCompany": "Pemco World Air Services",
            "legacyIds": [
                "a1d3448ccbb26eda5a957e30473398bc"
            ],
            "fullName": "Presley A Cobb",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Software Developer"
            ],
            "workPermitDocuments": [
                "US Citizenship"
            ],
            "firstName": "Presley",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/facebook.png",
                    "source": "Facebook"
                },
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "New Port Richey",
                    "countryCode": "US",
                    "latitude": 28.24418,
                    "source": "dice",
                    "text": "New Port Richey, Florida US",
                    "region": "Florida",
                    "longitude": -82.71927
                }
            ],
            "region": "Florida",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:26:10Z",
            "lastName": "Dotnet",
            "city": "Raleigh",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "State of Colorado- CDLE",
                    "location": "CO United States",
                    "title": "Senior .Net Developer",
                    "periodStart": {
                        "month": 10,
                        "year": 2016
                    }
                },
                "history": [
                    {
                        "org": "State of Colorado- CDLE",
                        "location": "CO United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Allscripts",
                        "location": "Raleigh NC United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 10,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Family and Social Services Administration",
                        "location": "IN United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Central Texas Medical Center",
                        "location": "San Marcos TX United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 4,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 5,
                            "year": 2014
                        }
                    },
                    {
                        "org": "Classified Solutions Group Inc",
                        "location": "New York City NY United States",
                        "title": "Net Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 3,
                            "year": 2013
                        }
                    },
                    {
                        "org": "Automotive Resources International",
                        "location": "Mt. Laurel NJ United States",
                        "periodStart": {
                            "month": 10,
                            "year": 2011
                        },
                        "periodEnd": {
                            "month": 5,
                            "year": 2012
                        }
                    },
                    {
                        "org": "Hypersoft Technologies Ltd",
                        "location": "India",
                        "title": "Software Engineer",
                        "periodStart": {
                            "month": 1,
                            "year": 2011
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2011
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": ".net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "c#"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "jquery"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "microsoft sql server"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "microsoft visual studio"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "controls"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "verification and validation"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "ado.net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "ajax"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "entity framework"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "stored procedures"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "unit testing"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "asp.net"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "microsoft ssis"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "restful"
                },
                {
                    "score": 15,
                    "skill": "asp.net ajax"
                },
                {
                    "score": 15,
                    "skill": "ssis"
                },
                {
                    "score": 15,
                    "skill": "validation"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 8,
            "currentJobTitle": "Senior .Net Developer",
            "id": "0efc4cc5b5ff9d7e446529cdb976f747975f531e",
            "dateResumeLastUpdated": "2019-11-05T11:21:33Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "State of Colorado- CDLE",
            "legacyIds": [
                "837fa5fd808f35684e2fc76bc8e6f379"
            ],
            "fullName": "Sneha Dotnet",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Senior .Net Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Sneha",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Raleigh",
                    "countryCode": "US",
                    "latitude": 35.77443,
                    "source": "dice",
                    "text": "Raleigh, North Carolina US",
                    "region": "North Carolina",
                    "longitude": -78.63136
                }
            ],
            "region": "North Carolina",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:20:23Z",
            "lastName": "Dotnet",
            "city": "Miami",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "State of Colorado- CDLE",
                    "location": "CO United States",
                    "title": "Senior .Net Developer",
                    "periodStart": {
                        "month": 10,
                        "year": 2016
                    }
                },
                "history": [
                    {
                        "org": "State of Colorado- CDLE",
                        "location": "CO United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Allscripts",
                        "location": "Raleigh NC United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 10,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Family and Social Services Administration",
                        "location": "IN United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Central Texas Medical Center",
                        "location": "San Marcos TX United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 4,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 5,
                            "year": 2014
                        }
                    },
                    {
                        "org": "Classified Solutions Group Inc",
                        "location": "New York City NY United States",
                        "title": "Net Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 3,
                            "year": 2013
                        }
                    },
                    {
                        "org": "Automotive Resources International",
                        "location": "Mt. Laurel NJ United States",
                        "periodStart": {
                            "month": 10,
                            "year": 2011
                        },
                        "periodEnd": {
                            "month": 5,
                            "year": 2012
                        }
                    },
                    {
                        "org": "Hypersoft Technologies Ltd",
                        "location": "India",
                        "title": "Software Engineer",
                        "periodStart": {
                            "month": 1,
                            "year": 2011
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2011
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": ".net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "c#"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "jquery"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "microsoft sql server"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "microsoft visual studio"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "controls"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "verification and validation"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "ado.net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "ajax"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "entity framework"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "stored procedures"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "unit testing"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "asp.net"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "microsoft ssis"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "restful"
                },
                {
                    "score": 15,
                    "skill": "asp.net ajax"
                },
                {
                    "score": 15,
                    "skill": "ssis"
                },
                {
                    "score": 15,
                    "skill": "validation"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 8,
            "currentJobTitle": "Senior .Net Developer",
            "id": "069449aa0280dfaebf59049d6704a6145d2a7a20",
            "dateResumeLastUpdated": "2019-11-05T11:18:51Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "State of Colorado- CDLE",
            "legacyIds": [
                "aa26741afa692625e95248946ab83c24"
            ],
            "fullName": "Sneha Dotnet",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Senior .Net Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Sneha",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Miami",
                    "countryCode": "US",
                    "latitude": 25.77833,
                    "source": "dice",
                    "text": "Miami, Florida US",
                    "region": "Florida",
                    "longitude": -80.19901
                }
            ],
            "region": "Florida",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:15:42Z",
            "lastName": "Dotnet",
            "city": "Bellevue",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "location": "MD United States",
                    "title": "Sr.NET Developer",
                    "periodStart": {
                        "month": 10,
                        "year": 2017
                    }
                },
                "history": [
                    {
                        "location": "MD United States",
                        "title": "Sr.NET Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2017
                        }
                    },
                    {
                        "org": "Omnicare",
                        "location": "Cincinnati Ohio United States",
                        "periodStart": {
                            "month": 1,
                            "year": 2017
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2017
                        }
                    },
                    {
                        "org": "Liberty Mutual",
                        "location": "Indianapolis Indiana United States",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2016
                        }
                    },
                    {
                        "org": "All State Insurance",
                        "location": "Northbrook IL United States",
                        "title": "NET Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Aeon Telectronics Pvt Ltd",
                        "periodStart": {
                            "month": 2,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "asp.net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "c#"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "microsoft sql server"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "microsoft visual studio"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "stored procedures"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "unit testing"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "microsoft tfs"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "css"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "entity framework"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "jquery"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "wcf"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "microsoft iis"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "ajax"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 5,
                    "skill": "ui"
                },
                {
                    "lastUsed": 2016,
                    "yearsUsed": 5,
                    "skill": "webforms"
                },
                {
                    "score": 15,
                    "skill": "iis"
                },
                {
                    "score": 15,
                    "skill": "tfs"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr.NET Developer",
            "id": "2242aa9ec77720a1095c14aa8fb79f8839c97d2c",
            "dateResumeLastUpdated": "2019-11-05T11:13:53Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "legacyIds": [
                "5da99d88e1dad55981f31ad60610ddbc"
            ],
            "fullName": "Sunil Dotnet",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr.NET Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Sunil",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Bellevue",
                    "countryCode": "US",
                    "latitude": 47.62648,
                    "source": "dice",
                    "text": "Bellevue, Washington US",
                    "region": "Washington",
                    "longitude": -122.20515
                }
            ],
            "region": "Washington",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:15:10Z",
            "lastName": "Dotnet",
            "city": "Littleton",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "location": "MD United States",
                    "title": "Sr.NET Developer",
                    "periodStart": {
                        "month": 10,
                        "year": 2017
                    }
                },
                "history": [
                    {
                        "location": "MD United States",
                        "title": "Sr.NET Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2017
                        }
                    },
                    {
                        "org": "Omnicare",
                        "location": "Cincinnati Ohio United States",
                        "periodStart": {
                            "month": 1,
                            "year": 2017
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2017
                        }
                    },
                    {
                        "org": "Liberty Mutual",
                        "location": "Indianapolis Indiana United States",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2016
                        }
                    },
                    {
                        "org": "All State Insurance",
                        "location": "Northbrook IL United States",
                        "title": "NET Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Aeon Telectronics Pvt Ltd",
                        "periodStart": {
                            "month": 2,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "asp.net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "c#"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "microsoft sql server"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "microsoft visual studio"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "stored procedures"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "unit testing"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "microsoft tfs"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "css"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "entity framework"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "jquery"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "wcf"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "microsoft iis"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "ajax"
                },
                {
                    "lastUsed": 2017,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2017,
                    "yearsUsed": 5,
                    "skill": "ui"
                },
                {
                    "lastUsed": 2016,
                    "yearsUsed": 5,
                    "skill": "webforms"
                },
                {
                    "score": 15,
                    "skill": "iis"
                },
                {
                    "score": 15,
                    "skill": "tfs"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr.NET Developer",
            "id": "b02ac52f2463f50a1efed2b610f36983c76019e8",
            "dateResumeLastUpdated": "2019-11-05T11:13:27Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "legacyIds": [
                "0e80a5bc4ac6acf3562b92058383d95e"
            ],
            "fullName": "Sunil Dotnet",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr.NET Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Sunil",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Littleton",
                    "countryCode": "US",
                    "latitude": 39.6166,
                    "source": "dice",
                    "text": "Littleton, Colorado US",
                    "region": "Colorado",
                    "longitude": -105.06743
                }
            ],
            "region": "Colorado",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:11:06Z",
            "lastName": "Dotnet",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "State of Colorado- CDLE",
                    "location": "CO United States",
                    "title": "Senior .Net Developer",
                    "periodStart": {
                        "month": 10,
                        "year": 2016
                    }
                },
                "history": [
                    {
                        "org": "State of Colorado- CDLE",
                        "location": "CO United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Allscripts",
                        "location": "Raleigh NC United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 10,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Family and Social Services Administration",
                        "location": "IN United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Central Texas Medical Center",
                        "location": "San Marcos TX United States",
                        "title": "Senior .Net Developer",
                        "periodStart": {
                            "month": 4,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 5,
                            "year": 2014
                        }
                    },
                    {
                        "org": "Classified Solutions Group Inc",
                        "location": "New York City NY United States",
                        "title": "Net Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 3,
                            "year": 2013
                        }
                    },
                    {
                        "org": "Automotive Resources International",
                        "location": "Mt. Laurel NJ United States",
                        "periodStart": {
                            "month": 10,
                            "year": 2011
                        },
                        "periodEnd": {
                            "month": 5,
                            "year": 2012
                        }
                    },
                    {
                        "org": "Hypersoft Technologies Ltd",
                        "location": "India",
                        "title": "Software Engineer",
                        "periodStart": {
                            "month": 1,
                            "year": 2011
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2011
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": ".net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "c#"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "jquery"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "microsoft sql server"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "microsoft visual studio"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 8,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "controls"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 8,
                    "skill": "verification and validation"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "ado.net"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "ajax"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "entity framework"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "stored procedures"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "unit testing"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "asp.net"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "microsoft ssis"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "restful"
                },
                {
                    "score": 15,
                    "skill": "asp.net ajax"
                },
                {
                    "score": 15,
                    "skill": "ssis"
                },
                {
                    "score": 15,
                    "skill": "validation"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 8,
            "currentJobTitle": "Senior .Net Developer",
            "id": "7c64c981f36f9e5933ddf355b323c03325f4244c",
            "dateResumeLastUpdated": "2019-11-05T11:06:45Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "State of Colorado- CDLE",
            "legacyIds": [
                "e98a21736e064370c7aa3e34b34e0899"
            ],
            "fullName": "Sneha Dotnet",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Senior .Net Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Sneha",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "countryCode": "US",
                    "latitude": 38.5929,
                    "source": "dice",
                    "text": ", Missouri US",
                    "region": "Missouri",
                    "longitude": -90.74853
                }
            ],
            "region": "Missouri",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:09:28Z",
            "lastName": "Javafullstack",
            "city": "Los Angeles",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Petco Animal Supplies, Inc",
                    "location": "CA United States",
                    "title": "Sr. Java Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Petco Animal Supplies, Inc",
                        "location": "CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "org": "S.P",
                        "location": "Richards GA United States",
                        "title": "Sr. Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Nissan CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 7,
                            "year": 2016
                        }
                    },
                    {
                        "location": "India",
                        "title": "Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "People Tech Group",
                        "location": "India",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "junit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "api"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "git"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "j2ee"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "json"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "soap"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "software deployment"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "restful"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "mockito"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "spring"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "apache struts"
                },
                {
                    "score": 15,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "struts"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 6,
            "currentJobTitle": "Sr. Java Developer",
            "id": "36f84a05454742f7c2f21ee8b0e2d398c69966bd",
            "dateResumeLastUpdated": "2019-11-05T11:07:12Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Petco Animal Supplies, Inc",
            "legacyIds": [
                "0ff98fe74408fbb06817cc993ec6f78b"
            ],
            "fullName": "Akshay Javafullstack",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Java Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Akshay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Los Angeles",
                    "countryCode": "US",
                    "latitude": 33.96979,
                    "source": "dice",
                    "text": "Los Angeles, California US",
                    "region": "California",
                    "longitude": -118.24681
                }
            ],
            "region": "California",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:04:29Z",
            "lastName": "Javafullstack",
            "city": "Des Plaines",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Petco Animal Supplies, Inc",
                    "location": "CA United States",
                    "title": "Sr. Java Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Petco Animal Supplies, Inc",
                        "location": "CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "org": "S.P",
                        "location": "Richards GA United States",
                        "title": "Sr. Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Nissan CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 7,
                            "year": 2016
                        }
                    },
                    {
                        "location": "India",
                        "title": "Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "People Tech Group",
                        "location": "India",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "junit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "api"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "git"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "j2ee"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "json"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "soap"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "software deployment"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "restful"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "mockito"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "spring"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "apache struts"
                },
                {
                    "score": 15,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "struts"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 6,
            "currentJobTitle": "Sr. Java Developer",
            "id": "cf8aea14be183ee4776bc5f6539f66e40890de36",
            "dateResumeLastUpdated": "2019-11-05T11:01:30Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Petco Animal Supplies, Inc",
            "legacyIds": [
                "2f4dc9f39963cd1f04b1f40e539abcd7"
            ],
            "fullName": "Akshay Javafullstack",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Java Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Akshay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Des Plaines",
                    "countryCode": "US",
                    "latitude": 42.01448,
                    "source": "dice",
                    "text": "Des Plaines, Illinois US",
                    "region": "Illinois",
                    "longitude": -87.89915
                }
            ],
            "region": "Illinois",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:04:21Z",
            "lastName": "Javafullstack",
            "city": "Chesterfield",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Petco Animal Supplies, Inc",
                    "location": "CA United States",
                    "title": "Sr. Java Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Petco Animal Supplies, Inc",
                        "location": "CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "org": "S.P",
                        "location": "Richards GA United States",
                        "title": "Sr. Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Nissan CA United States",
                        "title": "Sr. Java Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 7,
                            "year": 2016
                        }
                    },
                    {
                        "location": "India",
                        "title": "Java/J2EE Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2015
                        }
                    },
                    {
                        "org": "People Tech Group",
                        "location": "India",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 6,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "junit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "api"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "git"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "j2ee"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "json"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "soap"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "software deployment"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "restful"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "mockito"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "spring"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "apache struts"
                },
                {
                    "score": 15,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "struts"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 6,
            "currentJobTitle": "Sr. Java Developer",
            "id": "237f24d793ac855a063c65fdcfa49a9847aa931e",
            "dateResumeLastUpdated": "2019-11-05T11:01:46Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Petco Animal Supplies, Inc",
            "legacyIds": [
                "fef50d8f374097fdf315bac79dbd6b79"
            ],
            "fullName": "Akshay Javafullstack",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Java Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Akshay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Chesterfield",
                    "countryCode": "US",
                    "latitude": 38.66337,
                    "source": "dice",
                    "text": "Chesterfield, Missouri US",
                    "region": "Missouri",
                    "longitude": -90.57715
                }
            ],
            "region": "Missouri",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:03:30Z",
            "lastName": "Hadoop",
            "city": "Tampa",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Blackrock",
                    "location": "Atlanta GA United States",
                    "title": "Sr. Hadoop Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Blackrock",
                        "location": "Atlanta GA United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "location": "Fort Lauderdale FL United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Tampa FL United States",
                        "title": "Hadoop Developer | Syniverse technologies",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Local bazaar Pvt. Ltd | India",
                        "title": "Hadoop/Java Developer",
                        "periodStart": {
                            "month": 2,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Sogeti | India",
                        "title": "SQL Developer",
                        "periodStart": {
                            "month": 7,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "apache hadoop"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "real-time"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "apache pig"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "cluster"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "mapreduce"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "rdbms"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "scala"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache flume"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hbase"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hive"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache kafka"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache oozie"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache spark"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache sqoop"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache storm"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "distributed file system"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "hdfs"
                },
                {
                    "score": 135,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "hadoop"
                },
                {
                    "score": 15,
                    "skill": "hbase"
                },
                {
                    "score": 15,
                    "skill": "hive"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr. Hadoop Developer",
            "id": "08b159405dceeb7387992083a64178711ec9b1d8",
            "dateResumeLastUpdated": "2019-11-05T11:01:05Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Blackrock",
            "legacyIds": [
                "d09e04f24a6d2c4ee27fb9e0ac55e608"
            ],
            "fullName": "Ashay Hadoop",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Hadoop Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Ashay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Tampa",
                    "countryCode": "US",
                    "latitude": 27.9401,
                    "source": "dice",
                    "text": "Tampa, Florida US",
                    "region": "Florida",
                    "longitude": -82.45019
                }
            ],
            "region": "Florida",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T11:03:11Z",
            "lastName": "Java",
            "city": "Burlington",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Mayo Clinic",
                    "location": "Rochester MN United States",
                    "title": "Java Developer",
                    "periodStart": {
                        "month": 10,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Mayo Clinic",
                        "location": "Rochester MN United States",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2018
                        }
                    },
                    {
                        "org": "Fifth Third Bank",
                        "location": "Cincinnati OH United States",
                        "periodStart": {
                            "month": 3,
                            "year": 2018
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2018
                        }
                    },
                    {
                        "org": "Software Engineering          \nMasterCard",
                        "location": "New York NY United States",
                        "periodStart": {
                            "month": 8,
                            "year": 2017
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2018
                        }
                    },
                    {
                        "org": "About.com",
                        "location": "NY United States",
                        "title": "Senior Java Full Stack Developer",
                        "periodStart": {
                            "month": 2,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 6,
                            "year": 2017
                        }
                    },
                    {
                        "org": "General Mills",
                        "location": "Minneapolis MN United States",
                        "title": "Senior Full Stack Developer/UI Developer",
                        "periodStart": {
                            "month": 3,
                            "year": 2015
                        },
                        "periodEnd": {
                            "month": 1,
                            "year": 2016
                        }
                    },
                    {
                        "org": "EC Infosystems",
                        "location": "Uniondale NY United States",
                        "periodStart": {
                            "month": 8,
                            "year": 2013
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Fitch Ratings",
                        "location": "Wyomissing PA United States",
                        "title": "Java Developer",
                        "periodStart": {
                            "month": 10,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 7,
                            "year": 2013
                        }
                    },
                    {
                        "org": "Myntra Design Pvt Ltd",
                        "location": "India",
                        "title": "Java UI Developer",
                        "periodStart": {
                            "month": 12,
                            "year": 2011
                        },
                        "periodEnd": {
                            "month": 9,
                            "year": 2012
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 7,
                    "skill": "web services"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "restful"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 7,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "database"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "qa"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "xml"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "framework"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "ui"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "api"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "business requirements"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "json"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "junit"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "soap"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "jax-rs"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "hibernate"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "javascript"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 6,
                    "skill": "spring"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "css"
                },
                {
                    "lastUsed": 2018,
                    "score": 15,
                    "yearsUsed": 4,
                    "skill": "spring mvc"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Java Developer",
            "id": "8d43ab8814ac8a9f5740899709675c3cb875e7d2",
            "dateResumeLastUpdated": "2019-11-05T11:01:01Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Mayo Clinic",
            "legacyIds": [
                "55932e4504520b42ce4ac85da7f52259"
            ],
            "fullName": "Keerthi Java",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Java Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Keerthi",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Burlington",
                    "countryCode": "US",
                    "latitude": 42.05139,
                    "source": "dice",
                    "text": "Burlington, Illinois US",
                    "region": "Illinois",
                    "longitude": -88.54717
                }
            ],
            "region": "Illinois",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T10:58:08Z",
            "lastName": "Hadoop",
            "city": "Atlanta",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Blackrock",
                    "location": "Atlanta GA United States",
                    "title": "Sr. Hadoop Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Blackrock",
                        "location": "Atlanta GA United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "location": "Fort Lauderdale FL United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Tampa FL United States",
                        "title": "Hadoop Developer | Syniverse technologies",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Local bazaar Pvt. Ltd | India",
                        "title": "Hadoop/Java Developer",
                        "periodStart": {
                            "month": 2,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Sogeti | India",
                        "title": "SQL Developer",
                        "periodStart": {
                            "month": 7,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "apache hadoop"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "real-time"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "apache pig"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "cluster"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "mapreduce"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "rdbms"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "scala"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache flume"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hbase"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hive"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache kafka"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache oozie"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache spark"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache sqoop"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache storm"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "distributed file system"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "hdfs"
                },
                {
                    "score": 135,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "hadoop"
                },
                {
                    "score": 15,
                    "skill": "hbase"
                },
                {
                    "score": 15,
                    "skill": "hive"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr. Hadoop Developer",
            "id": "99efeae5487cd0fe3a40bef041cda0dde3187879",
            "dateResumeLastUpdated": "2019-11-05T10:55:26Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Blackrock",
            "legacyIds": [
                "50f08751068331f6ab6dde8ad729b925"
            ],
            "fullName": "Ashay Hadoop",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Hadoop Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Ashay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Atlanta",
                    "countryCode": "US",
                    "latitude": 33.76,
                    "source": "dice",
                    "text": "Atlanta, Georgia US",
                    "region": "Georgia",
                    "longitude": -84.39
                }
            ],
            "region": "Georgia",
            "securityAllowance": {
                "status": false
            }
        },
        {
            "country": "United States",
            "dateLastActive": "2019-11-05T10:57:38Z",
            "lastName": "Hadoop",
            "city": "Cleveland",
            "likelyToMoveScore": 100,
            "experience": {
                "current": {
                    "org": "Blackrock",
                    "location": "Atlanta GA United States",
                    "title": "Sr. Hadoop Developer",
                    "periodStart": {
                        "month": 1,
                        "year": 2018
                    }
                },
                "history": [
                    {
                        "org": "Blackrock",
                        "location": "Atlanta GA United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 1,
                            "year": 2018
                        }
                    },
                    {
                        "location": "Fort Lauderdale FL United States",
                        "title": "Sr. Hadoop Developer",
                        "periodStart": {
                            "month": 9,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2017
                        }
                    },
                    {
                        "location": "Tampa FL United States",
                        "title": "Hadoop Developer | Syniverse technologies",
                        "periodStart": {
                            "month": 1,
                            "year": 2016
                        },
                        "periodEnd": {
                            "month": 8,
                            "year": 2016
                        }
                    },
                    {
                        "org": "Local bazaar Pvt. Ltd | India",
                        "title": "Hadoop/Java Developer",
                        "periodStart": {
                            "month": 2,
                            "year": 2014
                        },
                        "periodEnd": {
                            "month": 12,
                            "year": 2015
                        }
                    },
                    {
                        "org": "Sogeti | India",
                        "title": "SQL Developer",
                        "periodStart": {
                            "month": 7,
                            "year": 2012
                        },
                        "periodEnd": {
                            "month": 2,
                            "year": 2014
                        }
                    }
                ]
            },
            "skills": [
                {
                    "lastUsed": 2019,
                    "yearsUsed": 6,
                    "skill": "apache hadoop"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "java"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 5,
                    "skill": "sql"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 5,
                    "skill": "software"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 4,
                    "skill": "real-time"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "apache pig"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "cluster"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "mapreduce"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "rdbms"
                },
                {
                    "lastUsed": 2019,
                    "score": 15,
                    "yearsUsed": 3,
                    "skill": "scala"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache flume"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hbase"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache hive"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache kafka"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache oozie"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache spark"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache sqoop"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "apache storm"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "distributed file system"
                },
                {
                    "lastUsed": 2019,
                    "yearsUsed": 3,
                    "skill": "hdfs"
                },
                {
                    "score": 135,
                    "skill": "apache"
                },
                {
                    "score": 15,
                    "skill": "hadoop"
                },
                {
                    "score": 15,
                    "skill": "hbase"
                },
                {
                    "score": 15,
                    "skill": "hive"
                }
            ],
            "hasEmail": true,
            "isThirdParty": true,
            "yearsOfExperience": 7,
            "currentJobTitle": "Sr. Hadoop Developer",
            "id": "addcd20e7b1d0236ecf75d66563b76b8090d30a6",
            "dateResumeLastUpdated": "2019-11-05T10:55:47Z",
            "workPreferences": [
                {
                    "willingToRelocate": true,
                    "employmentType": [
                        "Contract - Corp-to-Corp",
                        "Contract to Hire - Corp-to-Corp"
                    ]
                }
            ],
            "languages": [],
            "currentCompany": "Blackrock",
            "legacyIds": [
                "0726ec89e5e3587be3d0480738a4b2f6"
            ],
            "fullName": "Ashay Hadoop",
            "likelyToMove": true,
            "desiredJobTitles": [
                "Sr. Hadoop Developer"
            ],
            "workPermitDocuments": [
                "Have H1"
            ],
            "firstName": "Ashay",
            "socialProfiles": [
                {
                    "icon_64": "https://cdn-assets.workdigital.co.uk/icon/social/64/dice.png",
                    "source": "Dice"
                }
            ],
            "hasPhone": true,
            "workPermitLocations": [
                "US"
            ],
            "locations": [
                {
                    "country": "United States",
                    "city": "Cleveland",
                    "countryCode": "US",
                    "latitude": 41.4908,
                    "source": "dice",
                    "text": "Cleveland, Ohio US",
                    "region": "Ohio",
                    "longitude": -81.67268
                }
            ],
            "region": "Ohio",
            "securityAllowance": {
                "status": false
            }
        }
    ],
    "meta": {
        "pageSize": 25,
        "page": 1,
        "totalCount": 1784276
    },
    "usage": {
        "viewsConsumed": 0,
        "quota": 200,
        "customerId": 1923599,
        "viewsRemaining": 200
    },
    "filters": [
        {
            "value": "java or j2ee",
            "key": "q"
        },
        {
            "value": "OpenWeb",
            "key": "searchType"
        },
        {
            "value": "Java,Python,JavaScript",
            "key": "skills"
        },
        {
            "value": "activityDate",
            "key": "sortBy"
        },
        {
            "value": "desc",
            "key": "sortByDirection"
        }
    ]

    }
    console.log(this.diceCandidates)
    this.candidates = this.diceCandidates.data;
    this.candidatesLength = this.candidates.length;
    console.log(this.candidatesLength)
  }

  getAllCommonData() {
    const company = {
      userId: this.rtsUserId
    };

    this.requirementService.commonDetails(company)
      .subscribe(data => {
        if (data.success) {
          this.immigration = data.visaStatus;
        }
      });
  }

  getAllSkills() {
    const companyId = {
      companyId: this.rtsCompanyId
    };

    this.requirementService.getAllSkills(companyId)
      .subscribe(
        data => {
          this.ngProgress.done();
          if (data.success) {
            this.skills = data.skills;
          }
        });
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

  diceSelection() {
    console.log(this.selectedDice);
  }


  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }


  getCandidates(form: FormGroup) {
  }

  candidateFilter(form: FormGroup) {
    console.log(form)
  }

  resetForm() {
    this.candidateForm.reset();
  }

}
