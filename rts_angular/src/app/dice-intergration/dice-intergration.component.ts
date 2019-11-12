import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../Services/logged-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as _ from 'underscore';
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

    // lowValue: number = 0;
    // highValue: number = 10;

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
    diceCandidates: any;
    searchType: any;
    sortBy: string;
    workPermit: any[];
    selectedWorkPermit: any;
    distanceUnit: string;
    selectedEducationDegree: any[];
    employmentType: { "name": string; "value": string; }[];
    selectedEmploymentType: any[];
    languages: any[];
    selectedLanguages: any[];
    selectedSocialProfiles: any[];
    socialProfiles: string[];
    selectedQuery: string;
    selectedLocation: string;
    pageNumber: number = 1;
    pageSize: number;
    filterForm: FormGroup;
    isFilterAction: boolean;
    diceMetaDataCount: number;

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
        this.selectedWorkPermit = [];
        this.selectedEmploymentType = [];
        this.selectedEducationDegree = [];
        this.selectedLanguages = [];
        this.diceCandidates = {};
        this.selectedSocialProfiles = [];
        this.pageSize = 25;
        this.diceMetaDataCount = 0;
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
            distanceUnit: [''],
            lastActive: [''],
            hasEmail: [''],
            hasPhone: [''],
            relocate: [''],
            skills: [''],
            experience: [''],
            employmentType: [''],
            education: [''],
            workPermit: [''],
            pageSize: [''],
            jobTitle: [''],
            sortBy: [''],
            searchType: [''],
            language: [''],
            socialProfile: [''],
            // excludeThirdParty:[''],
        })
        // this.getAllDiceAccount();
        this.getAllSkills();
        this.contactMethod = [{ "name": "Email", "value": true }, { "name": "Phone", "value": true }];
        this.searchType = "Integrated";
        this.sortBy = "relevancy";
        this.distanceUnit = 'miles';
        this.languages = ["English", "Spanish", "French", "German", "Russian", "Hindi", "Portuguese", "Chinese", "Arabic", "Japanese"];
        this.socialProfiles = ["Github", "Stackoverflow", "Dribbble", "Twitter", "Facebook", "Linkedin", "Meetup"];
        this.workPermit = [
            { "name": "US", "value": "us" },
            { "name": "Citizenship", "value": "citizenship" },
            { "name": "Green Card", "value": "green card" },
            { "name": "Employment Auth Document", "value": "employment auth document" },
            { "name": "Have H1", "value": "have h1" },
            { "name": "Need H1", "value": "need h1" },
            { "name": "Have J1", "value": "have j1" },
            { "name": "TN Permit Holder", "value": "tn permit holder" },
        ]
        this.educationDegree = [
            { "name": "Bechelors", "value": "bechelors" },
            { "name": "Masters", "value": "masters" },
            { "name": "MBA", "value": "mba" },
            { "name": "Associate", "value": "associate" },
            { "name": "High School", "value": "high school" },
            { "name": "Vocational School", "value": "vocational school" },
            { "name": "Military Service", "value": "military service" }];
        this.employmentType = [
            { "name": "Full time", "value": "full - time" },
            { "name": "Contract - W2", "value": "contract - w2" },
            { "name": "Contract to Hire -W2", "value": "contract to hire - w2" },
            { "name": "Contract to Hire - Independent", "value": "contract to hire - independent" },
            { "name": "Contract - Independent", "value": "contract - independent" },
            { "name": "Part Time", "value": "part-time" },
            { "name": "Contract to Hire - Corp-to-Crop", "value": "contract to hire - corp-to-crop" },
            { "name": "Contract - Crop-to-Crop", "value": "contract - crop-to-crop" },
            { "name": "1099 Employee", "value": "1099 employee" },
            { "name": "Announced", "value": "announced" },
            { "name": "Crop-to-Crop", "value": "corp-to-crop" },
            { "name": "EB-1", "value": "eb-1" },
            { "name": "Eb-2", "value": "eb-2" },
            { "name": "Eb-3", "value": "eb-3" },
            { "name": "H1B", "value": "h-1b" },
            { "name": "H4", "value": "h-4" },
            { "name": "Independent", "value": "independent" },
            { "name": "J1", "value": "j-1" },
            { "name": "J2", "value": "j-2" },
            { "name": "Tax Term", "value": "tax term" },
            { "name": "W2", "value": "w-2" },
            { "name": "W2/1099", "value": "w-2/1099" }];
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

    // getAllDiceAccount() {
    //     const companyId = {
    //         companyId: this.rtsCompanyId
    //     };

    //     this.diceService.getAllDice(companyId)
    //         .subscribe(
    //             data => {
    //                 if (data.success) {
    //                     this.diceAccount = data.diceInfo;
    //                 }
    //             });
    // }


    public getPaginatorData(event: PageEvent): PageEvent {
        console.log(event)
        this.pageNumber = 1 + event.pageIndex;
        this.pageSize = event.pageSize;
        // if (this.isFilterAction) {
        //     this.filterFunction(this.filterForm)
        // } else {
            const submit = {
                userId: this.rtsUserId,
                q: this.selectedQuery,
                page: this.pageNumber + event.pageIndex,
                pageSize: event.pageSize,
                location: this.selectedLocation,
                sortByDirection: "desc",
            };
            this.diceService.diceSearch(submit)
                .subscribe(
                    data => {
                        this.ngProgress.done();
                        if (data.success) {
                            this.candidates = data.diceCandidate.data;
                            this.diceMetaDataCount = data.diceCandidate.meta.totalCount;
                            this.candidatesLength = this.candidates.length;

                        }
                    });
        // }
        return event;
    }


    getCandidates(form: FormGroup) {
        // if (this.diceMetaDataCount > 25) {
        //     this.filterFunction(this.filterForm);
        // }

        const submit = {
            userId: this.rtsUserId,
            q: form.value.query,
            location: form.value.location,
            page: this.pageNumber,
            sortByDirection: "desc",
        };
        this.diceService.diceSearch(submit)
            .subscribe(
                data => {
                    this.ngProgress.done();
                    if (data.success) {
                        this.candidates = data.diceCandidate.data;
                        this.diceMetaDataCount = data.diceCandidate.meta.totalCount;
                        this.candidatesLength = this.candidates.length;
                        console.log(this.candidates)
                    }
                });

    }

    candidateFilter(form: FormGroup) {
        console.log(form)
        // this.isFilterAction = true;
        // this.filterForm = form;
        // this.filterFunction(this.filterForm)
    // }

    // filterFunction(form) {
        const educationDegree = this.selectedEducationDegree.map(x => x).join(",");
        const workPermit = this.selectedWorkPermit.map(x => x).join(",");
        const employmentType = this.selectedEmploymentType.map(x => x).join(",");
        const language = this.selectedLanguages.map(x => x).join(",");
        const socialProfile = this.selectedSocialProfiles.map(x => x).join(",");

        const submit = {
            userId: this.rtsUserId,
            q: this.selectedQuery,
            location: form.value.location,
            sortBy: this.sortBy,
            searchType: this.searchType,
            page: this.pageNumber,
            pageSize: this.pageSize,
            skills: form.value.skills,
            sortByDirection: "desc",
            distance: parseInt(form.value.distance),
            distanceUnit: form.value.distanceUnit,
            lastActive: parseInt(form.value.lastActive),
            jobTitle: form.value.jobTitle,
            willingToRelocate: form.value.relocate,
            hasEmail: form.value.hasEmail,
            hasPhone: form.value.hasPhone,
            yearsOfExperience: form.value.experience,
            workPermit: workPermit,
            educationDegree: educationDegree,
            employmentType: employmentType,
            language: language,
            socialProfiles: socialProfile
        };
        console.log(submit)
        this.diceService.diceSearch(submit)
            .subscribe(
                data => {
                    this.ngProgress.done();
                    if (data.success) {
                        this.candidates = data.diceCandidate.data;
                        this.diceMetaDataCount = data.diceCandidate.meta.totalCount;
                        this.candidatesLength = this.candidates.length;
                    }
                });
    }

    resetForm() {
        this.candidateForm.reset();
    }

}
