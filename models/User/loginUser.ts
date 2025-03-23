class userAuth {
    private _email: string;
    private _password: string

    constructor (
        email: string,
        password: string
    ){
        this._email = email;
        this._password = password
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    set email(value: string) {
        this._email = value;
    }

    set password(value: string) {
        this._password = value;
    }
}

export default userAuth;