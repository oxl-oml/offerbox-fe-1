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

    login: urlBuilder(""),
    categories: urlBuilder("categories"),
    users: urlBuilder("users")
};

const axios = require('axios');

export class HttpHandler{


    

    //example
    loadProducts() : Promise<Product[]>{
        return axios.get(urls.products).then((response: { data: Product[]; }) => response.data);
    }

    //code

    login(): Promise<User>{
        return axios.get(urls.login).then((response: {data: User; }) => response.data);
    }

    loadCategories() : Promise<Category[]>{
        return axios.get(urls.categories).then((response: {data: Category[]}) => response.data);
    }

    loadUsers() : Promise<User[]>{
        return axios.get(urls.users).then((response: {data: User[]}) => response.data);
    }






    
}
