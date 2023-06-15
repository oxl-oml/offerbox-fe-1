import {
    AddProductResponse,
    Category,
    DefaultErrorResponse,
    LoginResponse,
    NewProductForm,
    PasswordChangeData,
    Product,
    RegisterResponse,
    RegistrationForm,
    User
} from "./entities";
import {useStore} from 'vuex';
import secureLogin from "@/data/scripts/secureLogin"

const axios = require('axios');

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
    return {
        headers: {
            "Authorization": getJwtAuthHeaderValue(),
            "Content-Type": `application/json`,
        }
    };
}

function getJwtAuthHeaderValue(): string {
    return `Bearer ${localStorage.getItem("JWT")}`
}

const urls = {
    products: urlBuilder("products"),
    orders: `${protocol}://${hostname}:${port}/orders`,

    login: urlBuilder("login"),
    register: urlBuilder("register"),
    categories: urlBuilder("categories"),
    users: urlBuilder("users"),
    allUsersReport: urlBuilder("users/admin/report"),
    changePassword: urlBuilder("users/password"),
    addProduct: urlBuilder("products")
};

export class HttpHandler{

    loadProducts() : Promise<Product[]>{
        const headers = headerBuilder();
        return axios.get(urls.products, headers).then((response: { data: Product[]; }) => response.data).catch((error: any) => console.log(error.response));
    }

    loadProductsByUser(): Promise<Product[]>{
        const headers = headerBuilder();
        const path = urls.products.concat(`/users/${(JSON.parse(localStorage.getItem('User') as string) as User).dbaseId}`);
        return axios.get(path, headers).then((response: { data: Product[]; }) => response.data).catch((error: any) => console.log(error.response));
    }


    loadProductById(): Promise<Product[]>{
        const headers = headerBuilder();
        var id = useStore().state.actualProductId;
        console.log("Loading product" + id);
        return axios.get(`${urls.products}/${id}`, headers).then((response: { data: Product[]; }) => response.data).catch((error: any) => console.log(error.response));
    }


    loadCategories() : Promise<Category[]>{
        const headers = headerBuilder();
        return axios.get(urls.categories, headers).then((response: {data: Category[]}) => response.data).catch((error: DefaultErrorResponse) => console.log(error));
    }

    loadUsers() : Promise<User[]>{
        const headers = headerBuilder();
        return axios.get(urls.users, headers).then((response: {data: User[]}) => response.data).catch(() => console.log());
    }

 
    loadUserById() : Promise<User | DefaultErrorResponse>{
        const headers = headerBuilder();
        return axios.get(urls.users, headers)
        .then((response: {data: User[]}) => response.data)
        .catch( (error: any) => {return error.response.data as DefaultErrorResponse});

    }
    
    loadReports() : Promise<ArrayBuffer>{
        return axios.get(urls.allUsersReport, {
            headers: {
                Authorization: getJwtAuthHeaderValue()
            },
            responseType: "blob"
        })
        .then((response: { data: ArrayBuffer; }) => response.data)
        .catch(() => console.log());
    }

    login(loginData : any): Promise<LoginResponse | DefaultErrorResponse>{
        const headers = headerBuilder();
        console.log(loginData.email);
        var tmp = JSON.stringify({
            "email": loginData.email,
            "password": secureLogin(loginData.password)
        });
        console.log(tmp);
        return axios.post(urls.login, tmp, headers)
        .then((response: {data: LoginResponse | DefaultErrorResponse; }) => { return response.data})
        .catch((error: any) => {return error.response.data as DefaultErrorResponse});
    }

    register(registerData: RegistrationForm): Promise<RegisterResponse | DefaultErrorResponse>{
        const headers = headerBuilder();
        var tmp = JSON.stringify({
            "name": registerData.firstName,
            "surname": registerData.lastName,
            "username": (`${registerData.firstName}_${registerData.lastName}_${Math.floor(Math.random()*99999)}`).toLowerCase(),
            "email": registerData.email,
            "phoneNumber": registerData.phone,
            "profileImageSrc": "https://i1.sndcdn.com/avatars-000618273024-j84woe-t500x500.jpg",
            "password": secureLogin(registerData.password1)
        });
        return axios.post(urls.register, tmp, headers)
        .then((response: {data: RegisterResponse | DefaultErrorResponse}) => { 
            return response.data;
        }).catch((error: any) => {
            return error.response.data as DefaultErrorResponse;
        });
    }

    updatePassword(passwordChangeData: PasswordChangeData): Promise<void | DefaultErrorResponse> {
        const headers = headerBuilder();
        const data = JSON.stringify(passwordChangeData);

        return axios.post(urls.changePassword, data, headers)
            .then((response: { data: void }) => {
                return response.data;
            }).catch((error: any) => {
                return error.response.data as DefaultErrorResponse;
            });
    }

    addProduct(product: NewProductForm): Promise<AddProductResponse | DefaultErrorResponse>{
        var tmp = JSON.stringify({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            categoryId: product.categoryId,
            

        });
        console.log(tmp);
        const headers = headerBuilder();
        return axios.post(urls.addProduct, tmp, headers)
        .then((response: {data: RegisterResponse | DefaultErrorResponse}) => { 
            return response.data;
        }).catch((error: any) => {
            console.log(error);
        });

    }


    
}
