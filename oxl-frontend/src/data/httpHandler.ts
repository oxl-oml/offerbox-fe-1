//import { Axios } from "axios";
import { Product} from "./entities";

const protocol = "http";
const hostname = "localhost";
const port = 4601;

const urls = {
    products: `${protocol}://${hostname}:${port}/products`,
    orders: `${protocol}://${hostname}:${port}/orders`
};

const axios = require('axios');

export class HttpHandler{
    loadProducts() : Promise<Product[]>{
        return axios.get(urls.products).then((response: { data: Product[]; }) => response.data);
    }

    
}
