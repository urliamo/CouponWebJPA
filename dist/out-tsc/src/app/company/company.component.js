import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Coupon } from '../shared/models/Coupon';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { CompanyService } from '../shared/services/company.service';
import { CouponService } from '../shared/services/coupon.service';
import { Router } from '@angular/router';
import { Company } from '../shared/models/Company';
import { Category } from '../shared/models/Category';
import { ClientType } from '../shared/models/ClientType';
var CompanyComponent = /** @class */ (function () {
    function CompanyComponent(userService, companyService, couponService, router) {
        this.userService = userService;
        this.companyService = companyService;
        this.couponService = couponService;
        this.router = router;
        this.myName = null;
        this.token = null;
        this.id = null;
        this.companyId = null;
        //create coupon && update
        this.couponId = null;
        this.category = null;
        this.title = null;
        this.description = null;
        this.startDate = null;
        this.endDate = null;
        this.amount = null;
        this.price = null;
        this.maxPrice = null;
        //update user
        this.userName = null;
        this.password = null;
        this.email = null;
        // toggles
        this.toggleGetCompany = false;
        this.toggleGetUser = false;
        this.toggleCreateCoupon = false;
        this.toggleGetCompanyCouponsByCompanyId = false;
        this.toggleGetCompanyCouponsByCategory = false;
        this.toggleGetCompanyCouponsByMaxPrice = false;
        this.toggleUpdateUser = false;
        this.toggleUpdateCoupon = false;
        // objects
        this.user = null;
        this.company = null;
        this.companyCouponsByCompanyId = null;
        this.companyCouponsByCategory = null;
        this.companyCouponsByMaxPrice = null;
        this.categories = null;
    }
    CompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categories = Object.values(Category).filter(function (index) { return (typeof Category[index] === 'number'); });
        this.token = parseInt(sessionStorage.getItem("token"));
        this.id = parseInt(sessionStorage.getItem("id"));
        this.companyId = parseInt(sessionStorage.getItem("company"));
        this.userService.getUserName(this.id, this.token).subscribe(function (res) { return _this.myName = res; }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.logOut = function () {
        var _this = this;
        this.userService.logOut(this.token).subscribe(function () {
            alert("You are logged out!\nWe hope to see you again!");
            sessionStorage.clear();
            _this.router.navigate(["/login"]);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.createCoupon = function () {
        var company = new Company(null, null, this.companyId);
        var image = this.category + ".jpg";
        var coupon = new Coupon(this.company, this.title, this.description, this.category, this.startDate, this.endDate, this.amount, this.price, image);
        this.couponService.createCoupon(coupon, this.token).subscribe(function () { return alert("Your coupon has been created"); }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.updateCoupon = function () {
        var company = new Company(null, null, this.companyId);
        var image = this.category + ".jpg";
        var coupon = new Coupon(company, this.title, this.description, this.category, this.startDate, this.endDate, this.amount, this.price, image, this.couponId);
        this.couponService.updateCoupon(coupon, this.token).subscribe(function () { return alert("Your coupon has been updated"); }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.updateUser = function () {
        var _this = this;
        var type = ClientType.Company;
        var user = new User(this.email, this.userName, this.password, this.id, type);
        this.userService.updateUser(user, this.token).subscribe(function () {
            _this.myName = user.userName;
            alert("Your user has been update");
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.deleteCoupon = function (couponId, type, index) {
        var _this = this;
        this.couponService.deleteCoupon(couponId, this.companyId, this.token).subscribe(function () {
            alert("Your coupon has been deleted");
            if (type === "id")
                _this.updateCouponsArray(_this.companyCouponsByCompanyId, index);
            else if (type === "category")
                _this.updateCouponsArray(_this.companyCouponsByCategory, index);
            else
                _this.updateCouponsArray(_this.companyCouponsByMaxPrice, index);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.deleteMyUser = function () {
        var _this = this;
        this.userService.deleteMyUser(this.id, this.token).subscribe(function () {
            alert("Your user has been deleted");
            _this.router.navigate(["/login"]);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.getCompany = function () {
        var _this = this;
        this.companyService.getCompany(this.companyId, this.token).subscribe(function (res) {
            _this.company = res;
            _this.isToggleGetCompany();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser(this.id, this.token).subscribe(function (res) {
            _this.user = res;
            _this.isToggleGetUser();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.getCompanyCouponsByCompanyId = function () {
        var _this = this;
        this.couponService.getCompanyCouponsByCompanyId(this.companyId, this.token).subscribe(function (res) {
            _this.companyCouponsByCompanyId = res;
            _this.isToggleGetCompanyCouponsByCompanyId();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CompanyComponent.prototype.getCompanyCouponsByCategory = function () {
        var _this = this;
        if (this.category == null)
            alert("Enter category plz");
        else {
            this.couponService.getCompanyCouponsByCategory(this.companyId, this.category, this.token).subscribe(function (res) { return _this.companyCouponsByCategory = res; }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
        }
    };
    CompanyComponent.prototype.getCompanyCouponsByMaxPrice = function () {
        var _this = this;
        if (this.maxPrice == null)
            alert("Enter max price plz");
        else {
            this.couponService.getCompanyCouponsByMaxPrice(this.companyId, this.maxPrice, this.token).subscribe(function (res) { return _this.companyCouponsByMaxPrice = res; }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
        }
    };
    CompanyComponent.prototype.updateCouponsArray = function (array, indexToDelete) {
        array.splice(indexToDelete, 1);
    };
    CompanyComponent.prototype.isToggleGetCompany = function () {
        this.toggleGetCompany = true;
        this.toggleGetUser = false;
        this.toggleCreateCoupon = false;
        this.toggleGetCompanyCouponsByCompanyId = false;
        this.toggleGetCompanyCouponsByCategory = false;
        this.toggleGetCompanyCouponsByMaxPrice = false;
        this.toggleUpdateUser = false;
        this.toggleUpdateCoupon = false;
    };
    CompanyComponent.prototype.isToggleGetUser = function () {
        this.toggleGetCompany = false;
        this.toggleGetUser = true;
        this.toggleCreateCoupon = false;
        this.toggleGetCompanyCouponsByCompanyId = false;
        this.toggleGetCompanyCouponsByCategory = false;
        this.toggleGetCompanyCouponsByMaxPrice = false;
        this.toggleUpdateUser = false;
        this.toggleUpdateCoupon = false;
    };
    CompanyComponent.prototype.isToggleCreateCoupon = function () {
        this.title = null;
        this.couponId = null;
        this.category = null;
        this.title = null;
        this.description = null;
        this.startDate = null;
        this.endDate = null;
        this.amount = null;
        this.price = null;
        this.toggleGetCompany = false;
        this.toggleGetUser = false;
        this.toggleCreateCoupon = true;
        this.toggleGetCompanyCouponsByCompanyId = false;
        this.toggleGetCompanyCouponsByCategory = false;
        this.toggleGetCompanyCouponsByMaxPrice = false;
        this.toggleUpdateUser = false;
        this.toggleUpdateCoupon = false;
    };
    CompanyComponent.prototype.isToggleGetCompanyCouponsByCompanyId = function () {
        this.toggleGetCompany = false;
        this.toggleGetUser = false;
        this.toggleCreateCoupon = false;
        this.toggleGetCompanyCouponsByCompanyId = true;
        this.toggleGetCompanyCouponsByCategory = false;
        this.toggleGetCompanyCouponsByMaxPrice = false;
        this.toggleUpdateUser = false;
        this.toggleUpdateCoupon = false;
    };
    CompanyComponent.prototype.isToggleGetCompanyCouponsByCategory = function () {
        this.category = null;
        this.companyCouponsByCategory = null;
        this.toggleGetCompany = false;
        this.toggleGetUser = false;
        this.toggleCreateCoupon = false;
        this.toggleGetCompanyCouponsByCompanyId = false;
        this.toggleGetCompanyCouponsByCategory = true;
        this.toggleGetCompanyCouponsByMaxPrice = false;
        this.toggleUpdateUser = false;
        this.toggleUpdateCoupon = false;
    };
    CompanyComponent.prototype.isToggleGetCompanyCouponsByMaxPrice = function () {
        this.maxPrice = null;
        this.companyCouponsByMaxPrice = null;
        this.toggleGetCompany = false;
        this.toggleGetUser = false;
        this.toggleCreateCoupon = false;
        this.toggleGetCompanyCouponsByCompanyId = false;
        this.toggleGetCompanyCouponsByCategory = false;
        this.toggleGetCompanyCouponsByMaxPrice = true;
        this.toggleUpdateUser = false;
        this.toggleUpdateCoupon = false;
    };
    CompanyComponent.prototype.isToggleUpdateUser = function () {
        this.userName = null;
        this.password = null;
        this.toggleGetCompany = false;
        this.toggleGetUser = false;
        this.toggleCreateCoupon = false;
        this.toggleGetCompanyCouponsByCompanyId = false;
        this.toggleGetCompanyCouponsByCategory = false;
        this.toggleGetCompanyCouponsByMaxPrice = false;
        this.toggleUpdateUser = true;
        this.toggleUpdateCoupon = false;
    };
    CompanyComponent.prototype.isToggleUpdateCoupon = function (couponId) {
        this.title = null;
        this.couponId = null;
        this.category = null;
        this.title = null;
        this.description = null;
        this.startDate = null;
        this.endDate = null;
        this.amount = null;
        this.price = null;
        this.couponId = couponId;
        this.toggleGetCompany = false;
        this.toggleGetUser = false;
        this.toggleCreateCoupon = false;
        this.toggleGetCompanyCouponsByCompanyId = false;
        this.toggleGetCompanyCouponsByCategory = false;
        this.toggleGetCompanyCouponsByMaxPrice = false;
        this.toggleUpdateUser = false;
        this.toggleUpdateCoupon = true;
    };
    CompanyComponent = tslib_1.__decorate([
        Component({
            selector: 'app-company',
            templateUrl: './company.component.html',
            styleUrls: ['./company.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, CompanyService, CouponService, Router])
    ], CompanyComponent);
    return CompanyComponent;
}());
export { CompanyComponent };
//# sourceMappingURL=company.component.js.map