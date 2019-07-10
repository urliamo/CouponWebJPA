import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var PurchaseService = /** @class */ (function () {
    function PurchaseService(http) {
        this.http = http;
    }
    PurchaseService.prototype.purchaseCoupon = function (purchase, token) {
        return this.http.post("http://localhost:8080/purchases?token=" + token, purchase);
    };
    PurchaseService.prototype.deletePurchaseById = function (purchaseId, token) {
        return this.http.delete("http://localhost:8080/purchases/" + purchaseId + "?token=" + token);
    };
    PurchaseService.prototype.getAmount = function (customerId, token) {
        return this.http.get("http://localhost:8080/purchases/amount?customerId=" + customerId + "&token=" + token);
    };
    PurchaseService.prototype.getCustomerPurchases = function (customerId, token) {
        return this.http.get("http://localhost:8080/purchases/customer?customerId=" + customerId + "&token=" + token);
    };
    PurchaseService.prototype.getAllPurchases = function (token) {
        return this.http.get("http://localhost:8080/purchases?token=" + token);
    };
    PurchaseService.prototype.getCustomerPurchasesByCategory = function (customerId, category, token) {
        return this.http.get("http://localhost:8080/purchases/customer/category?customerId=" + customerId + "&category=" + category + "&token=" + token);
    };
    PurchaseService.prototype.getCustomerPurchasesByMaxPrice = function (customerId, maxPrice, token) {
        return this.http.get("http://localhost:8080/purchases/customer/price?customerId=" + customerId + "&maxPrice=" + maxPrice + "&token=" + token);
    };
    PurchaseService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PurchaseService);
    return PurchaseService;
}());
export { PurchaseService };
//# sourceMappingURL=purchase.service.js.map