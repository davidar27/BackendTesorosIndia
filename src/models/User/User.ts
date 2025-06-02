export type UserRole = 'cliente' | 'emprendedor' | 'administrador';

// Propiedades base que comparten todos los usuarios
interface BaseUserProps {
    userId?: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    verified?: boolean;
    status?:string,
    image?: string;
    token_version?: number;
}

// Propiedades específicas para clientes
interface ClientProps extends BaseUserProps {
    role: 'cliente';
    address?: string;
    description?: never;
}

// Propiedades específicas para emprendedores
export interface EntrepreneurProps extends BaseUserProps {
    role: 'emprendedor';
    name_farm: string;
    description?: string;
    address?: never;
}

// Propiedades específicas para administradores
interface AdminProps extends BaseUserProps {
    role: 'administrador';
    description?: string;
    address?: string;
}

// Union type para todos los tipos de usuario
type UserProps = ClientProps | EntrepreneurProps | AdminProps;

export class User {
    private _data: UserProps;

    constructor(props: UserProps) {
        this.validateProps(props);
        this._data = {
            ...props,
            name: props.name.trim(),
            email: props.email.trim().toLowerCase(),
            phone: props.phone.trim(),
            verified: props.verified ?? false,
            token_version: props.token_version ?? 0,
            image: props.image || '',
            status:props.status
        };
    }

    private validateProps(props: UserProps): void {
        if (!props.name?.trim()) {
            throw new Error('Nombre inválido');
        }
        if (!this.isValidEmail(props.email)) {
            throw new Error('Email inválido');
        }
        if (!props.phone?.trim()) {
            throw new Error('Teléfono inválido');
        }
        if (props.userId !== undefined && (!Number.isInteger(props.userId) || props.userId < 0)) {
            throw new Error('ID de usuario inválido');
        }
        if (props.token_version !== undefined && (!Number.isInteger(props.token_version) || props.token_version < 0)) {
            throw new Error('Versión de token inválida');
        }

        // Validaciones específicas por rol
        switch (props.role) {
            case 'cliente':
                if (props.address && !props.address.trim()) {
                    throw new Error('La dirección no puede estar vacía');
                }
                break;
            case 'emprendedor':
                if (props.description && !props.description.trim()) {
                    throw new Error('La descripción no puede estar vacía');
                }
                break;
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    // Getters
    get userId(): number | undefined { return this._data.userId; }
    get name(): string { return this._data.name; }
    get email(): string { return this._data.email; }
    get password(): string { return this._data.password; }
    get phone(): string { return this._data.phone; }
    get verified(): boolean { return this._data.verified || false; }
    get role(): UserRole { return this._data.role; }
    get image(): string { return this._data.image || ''; }
    get status(): string { return this._data.status || ''}
    get token_version(): number { return this._data.token_version || 0; }

    // Getters condicionales basados en el rol


    get name_farm(): string | undefined {
        if (this._data.role === 'cliente') return undefined;
        return 'name_farm' in this._data ? this._data.name_farm : undefined;
    }

    get description(): string | undefined {
        if (this._data.role === 'cliente') return undefined;
        return 'description' in this._data ? this._data.description : undefined;
    }

    get address(): string | undefined {
        if (this._data.role === 'emprendedor') return undefined;
        return 'address' in this._data ? this._data.address : undefined;
    }

    // Setters con validación
    set password(value: string) {
        if (!value) throw new Error('Contraseña inválida');
        this._data.password = value;
    }

    set image(value: string) {
        if (value) {
            const baseUrl = value.split('?')[0];
            this._data.image = baseUrl;
        } else {
            this._data.image = '';
        }
    }

    set status(value: string){
        this._data.status = value || '';
    }

    // Método para actualizar propiedades
    update(props: Partial<Omit<UserProps, 'role'>>): void {
        if (props.name) {
            if (!props.name.trim()) throw new Error('Nombre inválido');
            this._data.name = props.name.trim();
        }
        if (props.email) {
            if (!this.isValidEmail(props.email)) throw new Error('Email inválido');
            this._data.email = props.email.trim().toLowerCase();
        }
        if (props.phone) {
            if (!props.phone.trim()) throw new Error('Teléfono inválido');
            this._data.phone = props.phone.trim();
        }
        if (props.image !== undefined) {
            this._data.image = props.image;
        }

        if (props.status !== undefined){
            this._data.status = props.status;
        }
        
        // Actualizaciones específicas por rol
        if (this._data.role === 'cliente' && 'address' in props) {
            if (!props.address?.trim()) throw new Error('Dirección inválida');
            (this._data as ClientProps).address = props.address.trim();
        }

        if (this._data.role === 'emprendedor' && 'name_farm' in props) {
            const name_farm = props.name_farm as string;
            if (!name_farm?.trim()) throw new Error('nombre de finca inválida');
            (this._data as EntrepreneurProps).name_farm = name_farm.trim();
        }

        // if (this._data.role === 'emprendedor' && 'description' in props) {
        //     if (!props.description?.trim()) throw new Error('Descripción inválida');
        //     (this._data as EntrepreneurProps).description = props.description.trim();
        // }


    }

    toJSON() {
        return { ...this._data };
    }

    // Factory methods
    static createClient(props: Omit<ClientProps, 'role' | 'verified' | 'token_version'>): User {
        return new User({
            ...props,
            role: 'cliente',
            verified: false,
            token_version: 0
        });
    }

    static createEntrepreneur(props: Omit<EntrepreneurProps, 'role' | 'verified' | 'token_version'>): User {
        return new User({
            ...props,
            role: 'emprendedor',
            verified: true,
            token_version: 0
        });
    }
}
