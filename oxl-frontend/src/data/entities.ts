export class Product {
    constructor(
        public name: string,
        public description: string,
        public categoryName: string,
        public price: number,
        public quantity: number,
        public dbaseId: number,
        public ownerId: number,
        public imageURL: string,
        public localId?: number

    ){};

    get fixedPrice(): string{
        return this.price.toFixed(2) + ' zł';
    }
    
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

export class Role{
    constructor(
        id_role: number,
        name: string,
        code: string,
        description: string
    ){}
}


