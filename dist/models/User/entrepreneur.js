"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entrepreneur = void 0;
class Entrepreneur {
    constructor(first_name, last_name, email, password, phone_number, role, description) {
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._password = password;
        this._phone_number = phone_number;
        this._role = role;
        this._description = description;
    }
    // Getters
    get first_name() {
        return this._first_name;
    }
    get last_name() {
        return this._last_name;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get phone_number() {
        return this._phone_number;
    }
    get role() {
        return this._role;
    }
    get description() {
        return this._description;
    }
    // Setters
    set first_name(first_name) {
        this._first_name = first_name;
    }
    set last_name(last_name) {
        this._last_name = last_name;
    }
    set email(email) {
        this._email = email;
    }
    set password(password) {
        this._password = password;
    }
    set phone_number(phone_number) {
        this._phone_number = phone_number;
    }
    set role(role) {
        this._role = role;
    }
    set description(description) {
        this._description = description;
    }
}
exports.Entrepreneur = Entrepreneur;
