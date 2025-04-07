export class User {
    private _first_name: string;
    private _last_name: string;
    private _email: string;
    private _password: string;
    private _phone_number: number;
    private _role: string;
    private _description?: string;

    constructor(
        first_name: string,
        last_name: string,
        email: string,        
        password: string,
        phone_number: number,
        role: string,
        description?: string
    ) {
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._password = password;
        this._phone_number = phone_number;
        this._role = role;

        if (role === "emprendedor") {
            this._description = description;
        }
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

    get phone_number(): number {
        return this._phone_number;
    }

    get role(): string {
        return this._role;
    }

    get description(): string | undefined {
        return this._description;
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
    
    set phone_number(phone_number: number) {
        this._phone_number = phone_number;
    }

    set role(role: string) {
        this._role = role;
    }

    set description(description: string | undefined) {
        this._description = description;
    }
}
