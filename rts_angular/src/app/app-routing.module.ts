import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { AddNewRequirementComponent } from './add-new-requirement/add-new-requirement.component';
import { EditRequirementComponent } from './edit-requirement/edit-requirement.component';
import { AddNewSubmissionsComponent } from './add-new-submissions/add-new-submissions.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RecruiterSubmissionsComponent } from './recruiter-submissions/recruiter-submissions.component';
import { RecruiterAddNewSubmissionsComponent } from './recruiter-add-new-submissions/recruiter-add-new-submissions.component';
import { SubmissionByRequirementComponent } from './submission-by-requirement/submission-by-requirement.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'requirements', component: RequirementsComponent },
  { path: 'submissions', component: SubmissionsComponent },
  { path: 'add-new-requirement', component: AddNewRequirementComponent },
  { path: 'edit-requirement/:id', component: EditRequirementComponent },
  { path: 'add-new-submission', component: AddNewSubmissionsComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'recruiter-submissions', component: RecruiterSubmissionsComponent },
  { path: 'recruiter-add-new-submissions', component: RecruiterAddNewSubmissionsComponent },
  { path: 'submission-by-requirement/:id', component: SubmissionByRequirementComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
