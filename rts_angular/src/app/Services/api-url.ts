import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrl {

    static BaseUrl = 'http://rameshrasaiyan.com:8080/';

    static AddCompanyUser = 'rtsUser/user/addCompanyUser';
    static UserLogin = 'rtsUser/user/userLogin';
    static GetAllRequirementsByCompany = 'rtsRequirement/requirement/getAllRequirementByCompany';
    static AddNewRequirement = 'rtsRequirement/requirement/insertRequirement';
    static GetAllUsersForAdmin = 'rtsUser/user/getAllUserForAdmin';
    static AddUser = 'rtsUser/user/addUser';
    static GetAllRequiementsForUser = 'rtsRequirement/requirement/getAllAllocationRequirementForUser';
    static AddNewSubmission = 'rtsSubmission/submission/newSubmission';
    static UpdateSubmission = 'rtsSubmission/submission/updateSubmission';
    static FileUpload = 'rtsSubmission/submission/fileUpload';
    static GetAllClientsForCompany = 'rtsClient/client/getAllClientForCompany';
    static AddClient = 'rtsClient/client/addClient';
}
