import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var CouponService = /** @class */ (function () {
    function CouponService(http) {
        this.http = http;
    }
    CouponService.prototype.createCoupon = function (coupon, token) {
        return this.http.post("http://localhost:8080/coupons?token=" + token, coupon);
    };
    CouponService.prototype.updateCoupon = function (coupon, token) {
        return this.http.put("http://localhost:8080/coupons?token=" + token, coupon);
    };
    CouponService.prototype.deleteCoupon = function (couponId, companyId, token) {
        return this.http.delete("http://localhost:8080/coupons/" + couponId + "?companyId=" + companyId + "&token=" + token);
    };
    CouponService.prototype.getCompanyCouponsByCompanyId = function (companyId, token) {
        return this.http.get("http://localhost:8080/coupons/company?companyId=" + companyId + "&token=" + token);
    };
    CouponService.prototype.getCompanyCouponsByCategory = function (companyId, category, token) {
        return this.http.get("http://localhost:8080/coupons/company/category?companyId=" + companyId + "&category=" + category + "&token=" + token);
    };
    CouponService.prototype.getCompanyCouponsByMaxPrice = function (companyId, maxPrice, token) {
        return this.http.get("http://localhost:8080/coupons/company/price?companyId=" + companyId + "&maxPrice=" + maxPrice + "&token=" + token);
    };
    CouponService.prototype.getAllCoupons = function (token) {
        return this.http.get("http://localhost:8080/coupons?token=" + token);
    };
    CouponService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CouponService);
    return CouponService;
}());
export { CouponService };
//# sourceMappingURL=coupon.service.js.map