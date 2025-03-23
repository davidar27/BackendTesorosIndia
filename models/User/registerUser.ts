class User {
    private _first_name: string;
    private _last_name: string;
    private _email: string;
    private _phone_number: Number;
    private _password: string;


    constructor(
        first_name: string,
        last_name: string,
        email: string,
        phone_number: Number,
        password: string,
    ) {
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._phone_number = phone_number;
        this._password = password;
    }

    get first_name(): string {
        return this._first_name;
    }

    get last_name(): string {
        return this._last_name;
    }

    get email(): string {
        return this._email;
    }

    get phone_number(): Number {
        return this._phone_number;
    }

    get password(): string {
        return this._password;
    }

    set first_name(first_name: string) {
        this._first_name = first_name;
    }

    set last_name(last_name: string) {
        this._last_name = last_name;
    }

    set email(email: string) {
        this._email = email;
    }

    set phone_number(phone_number: Number) {
        this._phone_number = phone_number;
    }

    set password(password: string) {
        this._password = password;
    }
}

export default User;
