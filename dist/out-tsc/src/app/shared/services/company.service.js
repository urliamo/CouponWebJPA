import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var CompanyService = /** @class */ (function () {
    function CompanyService(http) {
        this.http = http;
    }
    CompanyService.prototype.createCompany = function (company, token) {
        return this.http.post("http://localhost:8080/Companies?token=" + token, company);
    };
    CompanyService.prototype.updateCompany = function (company, token) {
        return this.http.put("http://localhost:8080/Companies?token=" + token, company);
    };
    CompanyService.prototype.deleteCompany = function (companyId, token) {
        return this.http.delete("http://localhost:8080/Companies/" + companyId + "?token=" + token);
    };
    CompanyService.prototype.getCompany = function (companyId, token) {
        return this.http.get("http://localhost:8080/Companies/" + companyId + "?token=" + token);
    };
    CompanyService.prototype.getAllCompanies = function (token) {
        return this.http.get("http://localhost:8080/Companies?token=" + token);
    };
    CompanyService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CompanyService);
    return CompanyService;
}());
export { CompanyService };
//# sourceMappingURL=company.service.js.map