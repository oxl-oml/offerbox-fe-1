export class Product {
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

    get fixedPrice(): string{
        return this.price.toFixed(2) + ' zł';
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

    public isAdmin(): boolean{
        return this.role=="admin"?true:false;
    }

    public isSuperAdmin():boolean{
        return this.role=="todo"?true:false;
        //TODO
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



