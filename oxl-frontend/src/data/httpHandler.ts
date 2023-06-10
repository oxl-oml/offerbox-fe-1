//import { Axios } from "axios";
import {
    Product,
    NewProductForm,
    User,
    Category,
    LoginResponse,
    RegistrationForm,
    RegisterResponse,
    DefaultErrorResponse,
    AddProductResponse,
    Alert,
    AlertTypes,
} from "./entities";
import  StoreState  from "@/store/index"; //TODO: Sprawnic, czy to nie jest zdrutowane
import { useStore } from 'vuex';
import { Context } from "./context";
import secureLogin from "@/data/scripts/secureLogin"
import router from "@/router";
import LoginPage from "@/views/LoginPage.vue"

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
    const context: Context = StoreState.getters.context; //TODO: To dotyczy tego wyzej i tez moze byc zdrutowane ale dziala wiec ye*ac
    if(!context.currentJWT){
        console.log("JWT token not provided");
    }
    const header = {
        Authorization: `Baerer ${context.currentJWT}`,
        'Content-Type': `application/json`, 
    };

    return header;
}

const urls = {
    products: urlBuilder("products"),
    favProducts: urlBuilder("favourites"),
    orders: `${protocol}://${hostname}:${port}/orders`,

    login: urlBuilder("login"),
    register: urlBuilder("register"),
    categories: urlBuilder("categories"),
    users: urlBuilder("users"),
    addProduct: urlBuilder("products")
};

const axios = require('axios');

export class HttpHandler{

    loadProducts() : Promise<Product[]>{
        return axios.get(urls.products,{headers: headerBuilder() }).then((response: { data: Product[]; }) => response.data).catch((error: any) => console.log(error.response));
    }

    loadFavouriteProducts(): Promise<Product[]> {
        return axios.get(urls.favProducts, {headers: headerBuilder() }).then((response: { data: Product[]; }) => response.data).catch((error: any) => console.log(error.response));
    }

    loadStoredProduct(): Promise<Product[]>{
        const id = useStore().state.actualProductId;
        return axios.get(`${urls.products}/${id}`, {headers: headerBuilder() }).then((response: { data: Product[]; }) => response.data).catch((error: any) => console.log(error.response));
    }

    loadCategories() : Promise<Category[]>{
        return axios.get(urls.categories).then((response: {data: Category[]}) => response.data).catch((error: DefaultErrorResponse) => console.log(error));
    }

    loadUsers() : Promise<User[]>{
        return axios.get(urls.users).then((response: {data: User[]}) => response.data).catch(() => console.log());
    }

    login(loginData : any): Promise<LoginResponse>{
        console.log(loginData.email);
        const tmp = JSON.stringify({
            "email": loginData.email,
            "password": secureLogin(loginData.password)
        });
        console.log(tmp);
        return axios.post(urls.login, tmp, {'Content-Type': 'application/json'})
        .then((response: {data: LoginResponse | any; }) => { console.log(response.data); return response.data})
        .catch((error: any) => console.log(error.response));
    }

    register(registerData: RegistrationForm): Promise<RegisterResponse | DefaultErrorResponse>{
        const tmp = JSON.stringify({
            "name": registerData.firstName,
            "surname": registerData.lastName,
            "username": (`${registerData.firstName}_${registerData.lastName}_${Math.floor(Math.random()*99999)}`).toLowerCase(),
            "email": registerData.email,
            "phoneNumber": registerData.phone,
            "profileImageSrc": "https://en.wikipedia.org/wiki/John_Doe#/media/File:John_and_Jane_Doe_Headstones.jpg",
            "password": secureLogin(registerData.password1)
        });
        console.log(tmp);
        return axios.post(urls.register, tmp, {'Content-Type': 'application/json'})
        .then((response: {data: RegisterResponse | DefaultErrorResponse}) => { 
            return response.data;
        }).catch((error: any) => {
            console.log(error);
        });
    }

    addProduct(product: NewProductForm): Promise<AddProductResponse | DefaultErrorResponse>{
        const tmp = JSON.stringify({
            name: product.name,

        });
        console.log(tmp);
        return axios.post(urls.addProduct, tmp, {headers: headerBuilder() })
        .then((response: {data: RegisterResponse | DefaultErrorResponse}) => { 
            return response.data;
        }).catch((error: any) => {
            console.log(error);
        });

    }


    
}
