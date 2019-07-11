import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var CustomerService = /** @class */ (function () {
    function CustomerService(http) {
        this.http = http;
    }
    CustomerService.prototype.createCustomer = function (customer) {
        return this.http.post("http://localhost:8080/customers/unsecured", customer);
    };
    CustomerService.prototype.updateCustomer = function (customer, token) {
        return this.http.put("http://localhost:8080/customers?token=" + token, customer);
    };
    CustomerService.prototype.deleteCustomer = function (customerId, token) {
        return this.http.delete("http://localhost:8080/customers/" + customerId + "?token=" + token);
    };
    CustomerService.prototype.getCustomerName = function (customerId, token) {
        return this.http.get("http://localhost:8080/customers/name/" + customerId + "?token=" + token, { responseType: 'text' });
    };
    CustomerService.prototype.getCustomer = function (customerId, token) {
        return this.http.get("http://localhost:8080/customers/" + customerId + "?token=" + token);
    };
    CustomerService.prototype.getOpponent = function (token) {
        return this.http.get("http://localhost:8080/customers/fight?token=" + token);
    };
    CustomerService.prototype.fightOpponent = function (opponentId, token) {
        return this.http.get("http://localhost:8080/customers/fight/" + opponentId + "?token=" + token);
    };
    CustomerService.prototype.getAllCustomers = function (token) {
        return this.http.get("http://localhost:8080/customers?token=" + token);
    };
    CustomerService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CustomerService);
    return CustomerService;
}());
export { CustomerService };
//# sourceMappingURL=customer.service.js.map