
export class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _phone_number: string;
    private _password: string;
    private _description?: string;
    private _verified: boolean;
    private _role?: string;


    constructor(
        id: number,
        name: string,
        email: string,
        phone_number: string,
        password: string,
        verified: boolean = false,
        role?: string,
        description?: string,
    ) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone_number = phone_number;
        this._password = password;
        this._verified = verified;
        this._role = role;

        if (role === "emprendedor") {
            this._description = description;
        }


    }

    get id(): number | undefined {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get phone_number(): string {
        return this._phone_number;
    }

    get password(): string {
        return this._password;
    }

    get role(): string | undefined {
        return this._role;
    }

    get description(): string | undefined {
        return this._description;
    }

    get verified(): boolean {
        return this._verified;
    }

    set name(name: string) {
        this._name = name;
    }

    set email(email: string) {
        this._email = email;
    }

    set phone_number(phone_number: string) {
        this._phone_number = phone_number;
    }

    set password(password: string) {
        this._password = password;
    }

    set role(role: string | undefined) {
        this._role = role;
    }

    set description(description: string | undefined) {
        this._description = description;
    }

    set verified(verified: boolean) {
        this._verified = verified;
    }
}
