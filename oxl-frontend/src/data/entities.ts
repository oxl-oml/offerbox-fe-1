interface IGetters{
    fixedPrice: string
}

export type RegistrationForm = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password1: string,
    password2: string
}

export type PasswordChangeData = {
    oldPassword: string,
    newPassword: string
}

export type LoginResponse = {
    tokenData: {
        token: string,
        expires: string
    },
    user: User
}

export type RegisterResponse = {
    id: number,
    role: string
}

export type AddProductResponse = {
    productId: number
}

export type DefaultErrorResponse = {
    status: string,
    statusCode: number,
    timestamp: number,
    message: string,
    details: string
}


export class Product implements IGetters {
    constructor(
        public name: string,
        public description: string,
        public categoryName: string,
        public price: number,
        public quantity: number,
        public dbaseId: number,
        public ownerId: number,
        public imageURL: string[],
        public localId?: number

    ){};

    public get fixedPrice(): string{
        return "DD";
        return (this.price.toFixed(2) + ' zł').toString();
    }

    public FixedPrice(): string{
        return (this.price.toFixed(2) + ' zł').toString();
    }

}

export class Category {
    constructor(
        public dbaseId: number,
        public parentId: number,
        public name: string,
        public description: string

    ){};
}

export namespace UserAccountStatus {
    export enum AccountStatus {
        active = "A",
        inactive = "I",
        verified = "V",
        unverified = "U",
        banned = "B",
        deleted = "D",
    }

    export function translate(str: string): string {
        if (str === AccountStatus.active) {
            return "Aktywny";
        }
        if (str === AccountStatus.inactive) {
            return "Nieaktywny";
        }
        if (str === AccountStatus.verified) {
            return "Zweryfikowany";
        }
        if (str === AccountStatus.unverified) {
            return "Niezweryfikowany";
        }
        if (str === AccountStatus.banned) {
            return "Zbanowany";
        }
        if (str === AccountStatus.deleted) {
            return "Usunięty";
        }
        return "";
    }
}

export enum AccountStatus {

}

export class User {

    constructor(
        public dbaseId: number,
        public username: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public profileImageUrl: string,
        private role: string,
        public accountStatus: string
    ){}

    public isAdmin(): boolean {
        return this.role === "ADM" || this.role === "ADM";
    }

}

export class Role{
    constructor(
        id_role: number,
        name: string,
        code: string,
        description: string
    ){}
}


export class LoginForm{
    constructor(
        public email: string,
        public password: string
    ){}
}

export class NewProductForm{
    constructor(
        public name: string,
        public description: string,
        public categoryId: number,
        public price: number,
        public quantity: number,
        public images: string[]
    ){}
}


export enum AlertTypes {
    ERROR,
    WARNING,
    INFORMATION
}
export class Alert{

    constructor(
        public alertType: AlertTypes,
        public message: string
    ){}
}




