import { User } from "./entities";

export class Context {
    private static instance: Context;

    private constructor() {}

    public static getInstance(): Context{
        if(!Context.instance) {
            Context.instance = new Context();
        }
        return Context.instance;
    }

    /* State variables */
    public currentUser?: User;
    public currentJWT?: string;

    public isAdmin(): boolean{
        //return this.currentUser?.isAdmin() || false;
        return true;
    }

    public isLogged(): boolean{
       // return this.currentUser?true:false;
       return true;
    }

}
