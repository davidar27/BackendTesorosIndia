"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(first_name, last_name, email, phone_number, password) {
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._phone_number = phone_number;
        this._password = password;
    }
    get first_name() {
        return this._first_name;
    }
    get last_name() {
        return this._last_name;
    }
    get email() {
        return this._email;
    }
    get phone_number() {
        return this._phone_number;
    }
    get password() {
        return this._password;
    }
    set first_name(first_name) {
        this._first_name = first_name;
    }
    set last_name(last_name) {
        this._last_name = last_name;
    }
    set email(email) {
        this._email = email;
    }
    set phone_number(phone_number) {
        this._phone_number = phone_number;
    }
    set password(password) {
        this._password = password;
    }
}
exports.default = User;
