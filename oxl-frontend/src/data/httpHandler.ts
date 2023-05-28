//import { Axios } from "axios";
import {Product, User, Category} from "./entities";

const protocol = "https";
const hostname = "api.trashv1.ct8.pl";
const port = 443;

function urlBuilder(x: string): string {
    return `${protocol}://${hostname}:${port}/api/${x}`
}

const urls = {
    products: urlBuilder("products"),
    orders: `${protocol}://${hostname}:${port}/orders`,

    login: urlBuilder("/login"),
    categories: urlBuilder("categories"),
    users: urlBuilder("users")
};

const axios = require('axios');

export class HttpHandler{


    

    loadProducts() : Promise<Product[]>{
        return axios.get(urls.products).then((response: { data: Product[]; }) => response.data).catch(() => console.log("HTTPS request error"));
    }

    loadCategories() : Promise<Category[]>{
        return axios.get(urls.categories).then((response: {data: Category[]}) => response.data).catch(() => console.log("HTTPS request error"));
    }

    loadUsers() : Promise<User[]>{
        return axios.get(urls.users).then((response: {data: User[]}) => response.data).catch(() => console.log("HTTPS request error"));
    }



    login(loginData : any): Promise<User>{
        return axios.post(urls.login, loginData).then((response: {data: User; }) => response.data).catch(() => console.log("HTTPS request error - login"));
    }




    
}
