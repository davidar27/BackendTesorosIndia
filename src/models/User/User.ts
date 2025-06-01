export class User {
    private _userId?: number;
    private _name: string;
    private _email: string;
    private _phone: string;
    private _password: string;
    private _description?: string;
    private _verified: boolean;
    private _role: string;
    private _token_version: number;

    constructor(
        name: string,
        email: string,
        phone: string,
        password: string,
        verified: boolean = false,
        role: string,
        userId?: number,
        description: string = '',
        token_version: number = 0,
    ) {
        if (!name || typeof name !== 'string') {
            throw new Error('Nombre inválido');
        }
        if (!email || typeof email !== 'string') {
            throw new Error('Email inválido');
        }
        if (!role || typeof role !== 'string') {
            throw new Error('Rol inválido');
        }

        this._userId = userId;
        this._name = name.trim();
        this._email = email.trim().toLowerCase();
        this._phone = phone ? phone.trim() : '';
        this._password = password;
        this._verified = verified;
        this._role = role;
        this._token_version = token_version;
        this._description = description;
    }

    get userId(): number | undefined {
        return this._userId;
    }

    set userId(value: number | undefined) {
        if (value !== undefined && (!Number.isInteger(value) || value < 0)) {
            throw new Error('ID de usuario inválido');
        }
        this._userId = value;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get phone(): string {
        return this._phone;
    }

    get password(): string {
        return this._password;
    }

    get role(): string {
        return this._role;
    }

    get description(): string | undefined {
        return this._description;
    }

    get verified(): boolean {
        return this._verified;
    }

    get token_version(): number {
        return this._token_version;
    }

    set name(value: string) {
        if (!value || typeof value !== 'string') {
            throw new Error('Nombre inválido');
        }
        this._name = value.trim();
    }

    set email(value: string) {
        if (!value || typeof value !== 'string') {
            throw new Error('Email inválido');
        }
        this._email = value.trim().toLowerCase();
    }

    set phone(value: string) {
        this._phone = value ? value.trim() : '';
    }

    set password(value: string) {
        if (!value || typeof value !== 'string') {
            throw new Error('Contraseña inválida');
        }
        this._password = value;
    }

    set role(value: string) {
        if (!value || typeof value !== 'string') {
            throw new Error('Rol inválido');
        }
        this._role = value;
    }

    set description(value: string | undefined) {
        this._description = value;
    }

    set verified(value: boolean) {
        this._verified = Boolean(value);
    }

    set token_version(value: number) {
        if (!Number.isInteger(value) || value < 0) {
            throw new Error('Versión de token inválida');
        }
        this._token_version = value;
    }

    toJSON() {
        return {
            userId: this._userId,
            name: this._name,
            email: this._email,
            phone: this._phone,
            verified: this._verified,
            role: this._role,
            description: this._description,
            token_version: this._token_version
        };
    }
}
