import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { User } from '../shared/models/User';
import { Customer } from '../shared/models/Customer';
import { Purchase } from '../shared/models/Purchase';
import { CustomerService } from '../shared/services/customer.service';
import { UserService } from '../shared/services/user.service';
import { PurchaseService } from '../shared/services/purchase.service';
import { CouponService } from '../shared/services/coupon.service';
import { Router } from '@angular/router';
import { Coupon } from '../shared/models/Coupon';
import { Category } from '../shared/models/Category';
import { ClientType } from '../shared/models/ClientType';
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(customerService, userService, purchaseService, couponService, router) {
        this.customerService = customerService;
        this.userService = userService;
        this.purchaseService = purchaseService;
        this.couponService = couponService;
        this.router = router;
        this.myName = null;
        this.token = null;
        this.id = null;
        this.email = null;
        // update customer
        this.userName = null;
        this.password = null;
        this.firstName = null;
        this.lastName = null;
        this.isEligibile = null;
        //coupon wars!!
        this.opponent = null;
        this.fightResults = null;
        //public customerCoupon: Coupon = null;
        //public opponentCoupon: Coupon = null;
        // amount of purchase
        this.amount = null;
        this.maxPrice = null;
        this.category = null;
        //Coupon Wars!!
        // toggles
        this.toggleGetUser = false;
        this.toggleUpdateCustomer = false;
        this.toggleGetCustomerPurchases = false;
        this.toggleGetAllCoupons = false;
        this.toggleCouponWars = false;
        this.toggleGetCustomerCouponsByCustomerId = false;
        this.toggleGetCustomerCouponsByCategory = false;
        this.toggleGetCustomerCouponsByMaxPrice = false;
        // objects
        this.user = null;
        this.customer = null;
        this.amountCoupons = null;
        this.customerPurchases = null;
        this.allCoupons = null;
        this.categories = null;
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categories = Object.values(Category).filter(function (index) { return (typeof Category[index] === 'number'); });
        this.token = parseInt(sessionStorage.getItem("token"));
        this.id = parseInt(sessionStorage.getItem("id"));
        this.customerService.getOpponent(this.token).subscribe(function (res) {
            _this.opponent = res;
            alert(_this.opponent.customerId);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
        this.getAllCoupons();
        this.customerService.getOpponent(this.token).subscribe(function (res) { return _this.opponent = res; }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
        this.customerService.getCustomerName(this.id, this.token).subscribe(function (res) { return _this.myName = res; }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
        this.purchaseService.getAmount(this.id, this.token).subscribe(function (res) { return _this.amountCoupons = res; }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
        this.customerService.getCustomer(this.id, this.token).subscribe(function (res) {
            _this.customer = res;
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.logOut = function () {
        var _this = this;
        this.userService.logOut(this.token).subscribe(function () {
            alert("logged out \\n come back soon!");
            sessionStorage.clear();
            _this.router.navigate(["/login"]);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.purchaseCoupon = function (couponId, index) {
        var _this = this;
        var coupon = new Coupon(null, null, null, null, null, null, null, null, null, couponId);
        var customer = new Customer(null, null, null, null, this.id);
        var purchase = new Purchase(coupon, this.amount, customer, null, null);
        this.purchaseService.purchaseCoupon(purchase, this.token).subscribe(function () {
            _this.amountCoupons += purchase.amount;
            _this.allCoupons[index].amount -= purchase.amount;
            alert("Your purchase has been done");
        }, function (err) { return alert('HTTP error! code:' + err.error.statusCode + '.\nMessage: ' + err.error.externalMessage); });
    };
    CustomerComponent.prototype.updateCustomer = function () {
        var _this = this;
        var type = ClientType.Customer;
        var user = new User(this.email, this.userName, this.password, this.id, type);
        var customer = new Customer(this.firstName, this.lastName, user, this.isEligibile, this.id);
        this.customerService.updateCustomer(customer, this.token).subscribe(function () {
            alert("Your customer has been updated");
            _this.myName = customer.firstName;
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.deleteCustomer = function () {
        var _this = this;
        this.customerService.deleteCustomer(this.id, this.token).subscribe(function () {
            alert("Your customer has been deleted");
            _this.router.navigate(["/login"]);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.deletePurchaseById = function (purchaseId, amount, index) {
        var _this = this;
        this.purchaseService.deletePurchaseById(purchaseId, this.token).subscribe(function () {
            alert("Your purchase has been deleted");
            _this.amountCoupons -= amount;
            _this.updateArray(_this.customerPurchases, index);
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser(this.id, this.token).subscribe(function (res) {
            _this.user = res;
            _this.isToggleGetUser();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.getCustomerPurchases = function () {
        var _this = this;
        this.purchaseService.getCustomerPurchases(this.id, this.token).subscribe(function (res) {
            _this.customerPurchases = res;
            _this.isToggleGetCustomerPurchases();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.getCustomerCouponsByCustomerId = function () {
        var _this = this;
        this.couponService.getAllCoupons(this.token).subscribe(function (res) {
            _this.allCoupons = res;
            _this.isToggleGetCustomerCouponsByCustomerId();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.getCustomerCouponsByCategory = function () {
        var _this = this;
        if (this.category == null)
            alert("Enter category please");
        else {
            this.purchaseService.getCustomerPurchasesByCategory(this.id, this.category, this.token).subscribe(function (res) { return _this.customerPurchases = res; }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
        }
    };
    CustomerComponent.prototype.getCustomerCouponsByMaxPrice = function () {
        var _this = this;
        if (this.maxPrice == null)
            alert("Enter max price plz");
        else {
            this.purchaseService.getCustomerPurchasesByMaxPrice(this.id, this.maxPrice, this.token).subscribe(function (res) { return _this.customerPurchases = res; }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
        }
    };
    CustomerComponent.prototype.getAllCoupons = function () {
        var _this = this;
        this.couponService.getAllCoupons(this.token).subscribe(function (res) {
            _this.allCoupons = res;
            _this.isToggleGetAllCoupons();
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.fightOpponent = function () {
        var _this = this;
        this.customerService.fightOpponent(this.opponent.customerId, this.token).subscribe(function (res) {
            _this.fightResults = res;
            if (_this.fightResults.customerCoupon.price > _this.fightResults.opponentCoupon.price) {
                alert("you win the fight, " + _this.myName + "!, your prize is:" + res.customerCoupon.title);
            }
            if (_this.fightResults.customerCoupon.price <= _this.fightResults.opponentCoupon.price) {
                alert("you lost the fight! winner is: " + _this.opponent.firstName + " with coupon: " + res.opponentCoupon.title);
            }
        }, function (err) { return alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage); });
    };
    CustomerComponent.prototype.updateArray = function (array, indexToDelete) {
        array.splice(indexToDelete, 1);
    };
    CustomerComponent.prototype.isToggleCouponWars = function () {
        this.toggleCouponWars = true;
        this.toggleGetUser = false;
        this.toggleUpdateCustomer = false;
        this.toggleGetCustomerPurchases = false;
        this.toggleGetAllCoupons = false;
        this.toggleGetCustomerCouponsByCustomerId = false;
        this.toggleGetCustomerCouponsByCategory = false;
        this.toggleGetCustomerCouponsByMaxPrice = false;
    };
    CustomerComponent.prototype.isToggleGetUser = function () {
        this.toggleGetUser = true;
        this.toggleUpdateCustomer = false;
        this.toggleGetCustomerPurchases = false;
        this.toggleGetAllCoupons = false;
        this.toggleGetCustomerCouponsByCustomerId = false;
        this.toggleGetCustomerCouponsByCategory = false;
        this.toggleGetCustomerCouponsByMaxPrice = false;
        this.toggleCouponWars = false;
    };
    CustomerComponent.prototype.isToggleUpdateCustomer = function () {
        this.userName = null;
        this.password = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.toggleCouponWars = false;
        this.toggleGetUser = false;
        this.toggleUpdateCustomer = true;
        this.toggleGetCustomerPurchases = false;
        this.toggleGetAllCoupons = false;
        this.toggleGetCustomerCouponsByCustomerId = false;
        this.toggleGetCustomerCouponsByCategory = false;
        this.toggleGetCustomerCouponsByMaxPrice = false;
    };
    CustomerComponent.prototype.isToggleGetCustomerPurchases = function () {
        this.toggleGetUser = false;
        this.toggleUpdateCustomer = false;
        this.toggleGetCustomerPurchases = true;
        this.toggleGetAllCoupons = false;
        this.toggleGetCustomerCouponsByCustomerId = false;
        this.toggleGetCustomerCouponsByCategory = false;
        this.toggleGetCustomerCouponsByMaxPrice = false;
    };
    CustomerComponent.prototype.isToggleGetAllCoupons = function () {
        this.amount = null;
        this.toggleCouponWars = false;
        this.toggleGetUser = false;
        this.toggleUpdateCustomer = false;
        this.toggleGetCustomerPurchases = false;
        this.toggleGetAllCoupons = true;
        this.toggleGetCustomerCouponsByCustomerId = false;
        this.toggleGetCustomerCouponsByCategory = false;
        this.toggleGetCustomerCouponsByMaxPrice = false;
    };
    CustomerComponent.prototype.isToggleGetCustomerCouponsByCustomerId = function () {
        this.toggleCouponWars = false;
        this.toggleGetUser = false;
        this.toggleUpdateCustomer = false;
        this.toggleGetCustomerPurchases = false;
        this.toggleGetAllCoupons = false;
        this.toggleGetCustomerCouponsByCustomerId = true;
        this.toggleGetCustomerCouponsByCategory = false;
        this.toggleGetCustomerCouponsByMaxPrice = false;
    };
    CustomerComponent.prototype.isToggleGetCustomerCouponsByCategory = function () {
        this.customerPurchases = null;
        this.category = null;
        this.toggleCouponWars = false;
        this.toggleGetUser = false;
        this.toggleUpdateCustomer = false;
        this.toggleGetCustomerPurchases = false;
        this.toggleGetAllCoupons = false;
        this.toggleGetCustomerCouponsByCustomerId = false;
        this.toggleGetCustomerCouponsByCategory = true;
        this.toggleGetCustomerCouponsByMaxPrice = false;
    };
    CustomerComponent.prototype.isToggleGetCustomerCouponsByMaxPrice = function () {
        this.customerPurchases = null;
        this.maxPrice = null;
        this.toggleCouponWars = false;
        this.toggleGetUser = false;
        this.toggleUpdateCustomer = false;
        this.toggleGetCustomerPurchases = false;
        this.toggleGetAllCoupons = false;
        this.toggleGetCustomerCouponsByCustomerId = false;
        this.toggleGetCustomerCouponsByCategory = false;
        this.toggleGetCustomerCouponsByMaxPrice = true;
    };
    CustomerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-customer',
            templateUrl: './customer.component.html',
            styleUrls: ['./customer.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [CustomerService, UserService, PurchaseService, CouponService, Router])
    ], CustomerComponent);
    return CustomerComponent;
}());
export { CustomerComponent };
//# sourceMappingURL=customer.component.js.map