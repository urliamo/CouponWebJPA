import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.login = function (user) {
        return this.http.post("http://localhost:8080/users/login/unsecured", user);
    };
    UserService.prototype.logOut = function (token) {
        return this.http.get("http://localhost:8080/users/logout?token=" + token);
    };
    UserService.prototype.createUser = function (user, token) {
        return this.http.post("http://localhost:8080/users?token=" + token, user);
    };
    UserService.prototype.updateUser = function (user, token) {
        return this.http.put("http://localhost:8080/users?token=" + token, user);
    };
    UserService.prototype.deleteMyUser = function (userId, token) {
        return this.http.delete("http://localhost:8080/users/" + userId + "?token=" + token);
    };
    UserService.prototype.deleteUser = function (userId, token) {
        return this.http.delete("http://localhost:8080/users/" + userId + "?token=" + token);
    };
    UserService.prototype.getUserName = function (userId, token) {
        return this.http.get("http://localhost:8080/users/name/" + userId + "?token=" + token, { responseType: 'text' });
    };
    UserService.prototype.getUser = function (userId, token) {
        return this.http.get("http://localhost:8080/users/" + userId + "?token=" + token);
    };
    UserService.prototype.getAllUsers = function (token) {
        return this.http.get("http://localhost:8080/users?token=" + token);
    };
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map