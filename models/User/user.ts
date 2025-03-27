class user {
    private _first_name: string;
    private _last_name: string;
    private _email: string;
    private _password: string;
    private _phone_number: Number;
    private _role : string;


    constructor(
        first_name: string,
        last_name: string,
        email: string,        
        password: string,
        phone_number: Number,
        role : string,
    ) {
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._password = password;
        this._phone_number = phone_number;
        this._role = role;
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

    get password(): string {
        return this._password;
    }

    get phone_number(): Number {
        return this._phone_number;
    }

    get role(): string{
        return this._role;
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

    set password(password: string) {
        this._password = password;
    }
    
    set phone_number(phone_number: Number) {
        this._phone_number = phone_number;
    }

    set role(role : string){
        this._role = role;
    }
}

export default user;
