import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Company } from '../shared/models/Company';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { CompanyService } from '../shared/services/company.service';
import { CustomerService } from '../shared/services/customer.service';
import { PurchaseService } from '../shared/services/purchase.service';
import { Router } from '@angular/router';
import { ClientType } from '../shared/models/ClientType';
var AdministratorComponent = /** @class */ (function () {
    function AdministratorComponent(userService, companyService, customerService, purchaseService, router) {
        this.userService = userService;
        this.companyService = companyService;
        this.customerService = customerService;
        this.purchaseService = purchaseService;
        this.router = router;
        this.myName = null;
        this.token = null;
        this.id = null;
        // create & update company
        this.companyName = null;
        this.email = null;
        this.companyId = null;
        // create user
        this.userName = null;
        this.password = null;
        this.clientType = null;
        this.companyUserId = null;
        this.userEmail = null;
        // update user
        this.userId = null;
        // toggles
        this.toggleGetUser = false;
        this.toggleUpdateUser = false;
        this.toggleCreateCompany = false;
        this.toggleUpdateCompany = false;
        this.toggleGetAllUsers = false;
        this.toggleGetAllCompanies = false;
        this.toggleGetAllCustomers = false;
        this.toggleGetAllPurchases = false;
        this.toggleCreateUser = false;
        // objects
        this.user = null;
        this.allUsers = null;
        this.allCustomers = null;
        this.allPurchases = null;
        this.allCompanies = null;
    }
    AdministratorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.token = parseInt(sessionStorage.getItem("token"));
        this.id = parseInt(sessionStorage.getItem("id"));
        this.userService.getUserName(this.id, this.token).subscribe(function (res) { return _this.myName = res; }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.logOut = function () {
        var _this = this;
        this.userService.logOut(this.token).subscribe(function () {
            alert("logged out \\n come back soon!");
            sessionStorage.clear();
            _this.router.navigate(["/login"]);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.createCompany = function () {
        var company = new Company(this.companyName, this.email);
        this.companyService.createCompany(company, this.token).subscribe(function () { return alert("Company has been created"); }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.createUser = function () {
        var user = new User(this.userName, this.email, this.password, null, this.clientType, null);
        if (this.clientType === "Company") {
            var company = new Company(null, null, this.companyUserId);
            user.company = company;
        }
        this.userService.createUser(user, this.token).subscribe(function () { return alert("User has been created"); }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.updateUser = function () {
        var _this = this;
        var user = new User(this.userEmail, this.userName, this.password, this.userId, this.clientType);
        this.userService.updateUser(user, this.token).subscribe(function () {
            alert("user has been updated");
            if (_this.id == user.id)
                _this.myName = user.userName;
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.updateCompany = function () {
        var company = new Company(this.companyName, this.email, this.companyId);
        this.companyService.updateCompany(company, this.token).subscribe(function () { return alert("company has been updated"); }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.deleteMyUser = function () {
        var _this = this;
        this.userService.deleteMyUser(this.id, this.token).subscribe(function () {
            alert("Your user has been deleted");
            _this.router.navigate(["/login"]);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.deleteUser = function (userId, index) {
        var _this = this;
        this.userService.deleteUser(userId, this.token).subscribe(function () {
            alert("user has been deleted");
            _this.updateArray(_this.allUsers, index);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.deleteCompany = function (companyId, index) {
        var _this = this;
        this.companyService.deleteCompany(companyId, this.token).subscribe(function () {
            alert("company has been deleted");
            _this.updateArray(_this.allCompanies, index);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser(this.id, this.token).subscribe(function (res) {
            _this.user = res;
            _this.isToggleGetUser();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.getAllCompanies = function () {
        var _this = this;
        this.companyService.getAllCompanies(this.token).subscribe(function (res) {
            _this.allCompanies = res;
            _this.isToggleGetAllCompanies();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.getAllCustomers = function () {
        var _this = this;
        this.customerService.getAllCustomers(this.token).subscribe(function (res) {
            _this.allCustomers = res;
            _this.isToggleGetAllCustomers();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.getAllPurchases = function () {
        var _this = this;
        this.purchaseService.getAllPurchases(this.token).subscribe(function (res) {
            _this.allPurchases = res;
            _this.isToggleGetAllPurchases();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.userService.getAllUsers(this.token).subscribe(function (res) {
            _this.allUsers = res;
            _this.isToggleGetAllUsers();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    AdministratorComponent.prototype.updateArray = function (array, indexToDelete) {
        array.splice(indexToDelete, 1);
    };
    // use by html
    AdministratorComponent.prototype.availableToDelete = function (type, id) {
        if (type === ClientType.Administrator && id !== this.id) {
            return false;
        }
        return true;
    };
    AdministratorComponent.prototype.isToggleGetUser = function () {
        this.toggleGetUser = true;
        this.toggleUpdateUser = false;
        this.toggleCreateCompany = false;
        this.toggleUpdateCompany = false;
        this.toggleGetAllUsers = false;
        this.toggleGetAllCompanies = false;
        this.toggleGetAllCustomers = false;
        this.toggleGetAllPurchases = false;
        this.toggleCreateUser = false;
    };
    AdministratorComponent.prototype.isToggleUpdateUser = function (userId) {
        this.userName = null;
        this.password = null;
        this.userId = userId;
        this.toggleGetUser = false;
        this.toggleUpdateUser = true;
        this.toggleCreateCompany = false;
        this.toggleUpdateCompany = false;
        this.toggleGetAllUsers = false;
        this.toggleGetAllCompanies = false;
        this.toggleGetAllCustomers = false;
        this.toggleGetAllPurchases = false;
        this.toggleCreateUser = false;
    };
    AdministratorComponent.prototype.isToggleCreateCompany = function () {
        this.companyName = null;
        this.email = null;
        this.toggleGetUser = false;
        this.toggleUpdateUser = false;
        this.toggleCreateCompany = true;
        this.toggleUpdateCompany = false;
        this.toggleGetAllUsers = false;
        this.toggleGetAllCompanies = false;
        this.toggleGetAllCustomers = false;
        this.toggleGetAllPurchases = false;
        this.toggleCreateUser = false;
    };
    AdministratorComponent.prototype.isToggleUpdateCompany = function (companyId) {
        this.companyName = null;
        this.email = null;
        this.companyId = companyId;
        this.toggleGetUser = false;
        this.toggleUpdateUser = false;
        this.toggleCreateCompany = false;
        this.toggleUpdateCompany = true;
        this.toggleGetAllUsers = false;
        this.toggleGetAllCompanies = false;
        this.toggleGetAllCustomers = false;
        this.toggleGetAllPurchases = false;
        this.toggleCreateUser = false;
    };
    AdministratorComponent.prototype.isToggleGetAllUsers = function () {
        this.toggleGetUser = false;
        this.toggleUpdateUser = false;
        this.toggleCreateCompany = false;
        this.toggleUpdateCompany = false;
        this.toggleGetAllUsers = true;
        this.toggleGetAllCompanies = false;
        this.toggleGetAllCustomers = false;
        this.toggleGetAllPurchases = false;
        this.toggleCreateUser = false;
    };
    AdministratorComponent.prototype.isToggleGetAllCompanies = function () {
        this.toggleGetUser = false;
        this.toggleUpdateUser = false;
        this.toggleCreateCompany = false;
        this.toggleUpdateCompany = false;
        this.toggleGetAllUsers = false;
        this.toggleGetAllCompanies = true;
        this.toggleGetAllCustomers = false;
        this.toggleGetAllPurchases = false;
        this.toggleCreateUser = false;
    };
    AdministratorComponent.prototype.isToggleGetAllCustomers = function () {
        this.toggleGetUser = false;
        this.toggleUpdateUser = false;
        this.toggleCreateCompany = false;
        this.toggleUpdateCompany = false;
        this.toggleGetAllUsers = false;
        this.toggleGetAllCompanies = false;
        this.toggleGetAllCustomers = true;
        this.toggleGetAllPurchases = false;
        this.toggleCreateUser = false;
    };
    AdministratorComponent.prototype.isToggleGetAllPurchases = function () {
        this.toggleGetUser = false;
        this.toggleUpdateUser = false;
        this.toggleCreateCompany = false;
        this.toggleUpdateCompany = false;
        this.toggleGetAllUsers = false;
        this.toggleGetAllCompanies = false;
        this.toggleGetAllCustomers = false;
        this.toggleGetAllPurchases = true;
        this.toggleCreateUser = false;
    };
    AdministratorComponent.prototype.isToggleCreateUser = function (type, companyId) {
        this.userName = null;
        this.password = null;
        this.companyUserId = null;
        this.clientType = type;
        if (type === ClientType.Company)
            this.companyUserId = companyId;
        this.toggleGetUser = false;
        this.toggleUpdateUser = false;
        this.toggleCreateCompany = false;
        this.toggleUpdateCompany = false;
        this.toggleGetAllUsers = false;
        this.toggleGetAllCompanies = false;
        this.toggleGetAllCustomers = false;
        this.toggleGetAllPurchases = false;
        this.toggleCreateUser = true;
    };
    AdministratorComponent = tslib_1.__decorate([
        Component({
            selector: 'app-administrator',
            templateUrl: './administrator.component.html',
            styleUrls: ['./administrator.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, CompanyService, CustomerService, PurchaseService, Router])
    ], AdministratorComponent);
    return AdministratorComponent;
}());
export { AdministratorComponent };
//# sourceMappingURL=administrator.component.js.map