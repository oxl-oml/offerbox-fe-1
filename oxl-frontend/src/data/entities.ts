export class Product {
    constructor(
        name: string,
        description: string,
        categoryName: string,
        price: number,
        quantity: number,
        dbaseId: number,
        ownerId: number,
        localId?: number

    ){};
}

export class Category {
    constructor(
        dbaseId: number,
        name: string,
        description: string
    ){};
}


export class User {

    constructor(
        dbaseId: number,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        profileImageUrl: string,
        private role: string
    ){}

    public isAdmin(): boolean{
        return this.role=="admin"?true:false;
    }
}


