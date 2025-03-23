"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(first_name, last_name, email, phone_number, password) {
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._phone_number = phone_number;
        this._password = password;
    }
    Object.defineProperty(User.prototype, "first_name", {
        get: function () {
            return this._first_name;
        },
        set: function (first_name) {
            this._first_name = first_name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "last_name", {
        get: function () {
            return this._last_name;
        },
        set: function (last_name) {
            this._last_name = last_name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (email) {
            this._email = email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "phone_number", {
        get: function () {
            return this._phone_number;
        },
        set: function (phone_number) {
            this._phone_number = phone_number;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (password) {
            this._password = password;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
exports.default = User;
