import { User } from "./entities";

export class Context {
    private static instance: Context;

    private constructor() {}

    public static getInstance(): Context{
        if(!Context.instance){
            Context.instance = new Context();
        }

        return Context.instance;
    }


    /* Connection with API */
    private readonly apiProtocol = "http";
    private readonly apiHostname = "localhost";
    private readonly apiPort = 4601;


    /* State variables */
    private currentUser?: User;


}