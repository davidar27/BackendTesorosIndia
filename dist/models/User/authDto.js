"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userAuth = /** @class */ (function () {
    function userAuth(email, password) {
        this._email = email;
        this._password = password;
    }
    Object.defineProperty(userAuth.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(userAuth.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            this._password = value;
        },
        enumerable: false,
        configurable: true
    });
    return userAuth;
}());
exports.default = userAuth;
