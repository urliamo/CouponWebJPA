import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoginForm } from '../shared/models/LoginForm';
import { Customer } from '../shared/models/Customer';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { CustomerService } from '../shared/services/customer.service';
import { Router } from '@angular/router';
import { ClientType } from '../shared/models/ClientType';
var UserComponent = /** @class */ (function () {
    function UserComponent(userService, customerService, router) {
        this.userService = userService;
        this.customerService = customerService;
        this.router = router;
        this.userName = null;
        this.password = null;
        this.passwordConfirm = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
    }
    UserComponent.prototype.login = function () {
        var _this = this;
        var user = new LoginForm(this.userName, this.password);
        this.userService.login(user).subscribe(function (res) {
            if (res.clientType === ClientType.Customer)
                _this.router.navigate(["login/customers"]);
            else if (res.clientType === ClientType.Company) {
                _this.router.navigate(["login/companies"]);
                sessionStorage.setItem("company", res.companyId + "");
            }
            else
                _this.router.navigate(["login/administrator"]);
            sessionStorage.setItem("token", res.token + "");
            sessionStorage.setItem("id", res.userId + "");
            _this.userName = null;
            _this.password = null;
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    UserComponent.prototype.register = function () {
        var user = new User(this.userName, this.email, this.password, null, ClientType.Customer, null);
        alert(user.type);
        var customer = new Customer(this.firstName, this.lastName, user, null);
        alert(customer.user.type);
        if (this.password != this.passwordConfirm)
            alert("Your password did not match!");
        else {
            this.customerService.createCustomer(customer).subscribe(function () { return alert("your user has been created"); }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
        }
    };
    UserComponent.prototype.toggleSignup = function () {
        this.userName = null;
        this.password = null;
        this.passwordConfirm = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        document.getElementById("login-toggle").style.backgroundColor = "#fff";
        document.getElementById("login-toggle").style.color = "#222";
        document.getElementById("signup-toggle").style.backgroundColor = "#57b846";
        document.getElementById("signup-toggle").style.color = "#fff";
        document.getElementById("login-form").style.display = "none";
        document.getElementById("signup-form").style.display = "block";
    };
    UserComponent.prototype.toggleLogin = function () {
        this.userName = null;
        this.password = null;
        document.getElementById("login-toggle").style.backgroundColor = "#57B846";
        document.getElementById("login-toggle").style.color = "#fff";
        document.getElementById("signup-toggle").style.backgroundColor = "#fff";
        document.getElementById("signup-toggle").style.color = "#222";
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
    };
    UserComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, CustomerService, Router])
    ], UserComponent);
    return UserComponent;
}());
export { UserComponent };
//# sourceMappingURL=user.component.js.map