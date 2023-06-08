//import { Axios } from "axios";
import {Product, User, Category, LoginResponse, RegistrationForm, RegisterResponse, RegisterErrorResponse} from "./entities";
import  StoreState  from "@/store/index"; //TODO: Sprawnic, czy to nie jest zdrutowane
import { useStore } from 'vuex';
import { Context } from "./context";
import secureLogin from "@/data/scripts/secureLogin"
import router from "@/router";

//connection
const protocol = "https";
const hostname = "api.trashv1.ct8.pl";
const port = 443;

//other
const store = useStore();



function urlBuilder(x: string): string {
    return `${protocol}://${hostname}:${port}/api/${x}`
}

function headerBuilder(){
    var context: Context = StoreState.getters.context; //TODO: To dotyczy tego wyzej i tez moze byc zdrutowane ale dziala wiec ye*ac
    if(!context.currentJWT){
        console.log("JWT token not provided");
    }
    var header = {
        Authorization: `Baerer ${context.currentJWT}` 
    }
    return header;
}

const urls = {
    products: urlBuilder("products"),
    orders: `${protocol}://${hostname}:${port}/orders`,

    login: urlBuilder("login"),
    register: urlBuilder("register"),
    categories: urlBuilder("categories"),
    users: urlBuilder("users")
};

const axios = require('axios');

export class HttpHandler{

    loadProducts() : Promise<Product[]>{
        return axios.get(urls.products,{headers: headerBuilder() }).then((response: { data: Product[]; }) => response.data).catch((error: any) => console.log(error.response));
    }

    loadStoredProduct(): Promise<Product[]>{
        var id = useStore().state.actualProductId;
        return axios.get(`${urls.products}/${id}`, {headers: headerBuilder() }).then((response: { data: Product[]; }) => response.data).catch((error: any) => console.log(error.response));
    }


    loadCategories() : Promise<Category[]>{
        return axios.get(urls.categories).then((response: {data: Category[]}) => response.data).catch((error: any) => console.log(error.response));
    }

    loadUsers() : Promise<User[]>{
        return axios.get(urls.users).then((response: {data: User[]}) => response.data).catch(() => console.log());
    }

    
    login(loginData : any): Promise<User>{
        console.log(loginData.email);
        var tmp = JSON.stringify({
            "email": loginData.email,
            "password": secureLogin(loginData.password)
            //"email": "jktest@test.com",
            //"password": "123456"
        });
        console.log(tmp);
        return axios.post(urls.login, tmp, {'Content-Type': 'application/json'}).then((response: {data: LoginResponse | any; }) => { console.log(response.data); return response.data}).catch((error: any) => console.log(error.response));
    }

    register(registerData: RegistrationForm): Promise<any>{
        console.log(registerData);
        var tmp = JSON.stringify({
            "name": registerData.firstName,
            "surname": registerData.lastName,
            "username": (`${registerData.firstName}_${registerData.lastName}_${Math.floor(Math.random()*99999)}`).toLowerCase(),
            "email": registerData.email,
            "phoneNumber": registerData.phone,
            "profileImageSrc": "https://en.wikipedia.org/wiki/John_Doe#/media/File:John_and_Jane_Doe_Headstones.jpg",
            "password": secureLogin(registerData.password1)
        })
        console.log(tmp);
        return axios.post(urls.login, tmp, {'Content-Type': 'application/json'}).then((response: {data: RegisterResponse}) => { console.log(response.data); router.push("/login"); return response.data}).catch((error: RegisterErrorResponse) => console.log(error));
    }


    
}
