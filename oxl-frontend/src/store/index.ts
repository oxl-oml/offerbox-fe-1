import {createStore} from 'vuex'
import {
    AddProductResponse,
    Alert,
    Category,
    DefaultErrorResponse,
    LoginResponse,
    Product,
    User
} from '@/data/entities'
import {Context} from '@/data/context';


export interface StoreState {
    products: Product[],     //store products
    favouriteProducts: Product[], // store favourite products
    categories: Category[],  //store all categories
    selectedCategory: string,//store selected category
    context: Context,       //store user data like JWT
    storedProduct?: Product, //store product in /product/id page
    actualProductId?: number,//store id catched from url
    actualAlert?: Alert

    //admin
    users: User[],
    selectedAdminOption: "",
}

export default createStore<StoreState>({
    state: {
        products: [],
        favouriteProducts: [],
        categories: [],
        selectedCategory: 'All',
        context: Context.getInstance(),
        storedProduct: new Product("", "", "", 0, 0, 0, 0, []),
        users: [],
        selectedAdminOption: "",

    },
    getters: {
        favProducts(state): Product[] {
            const userId = state.context.currentUser?.dbaseId;
            return userId === undefined
                ? []
                : [];
        },

        products(state, category?): Product[] {
            if (category) {
                console.log(state.selectedCategory);
                return state.products
                    .filter(p => state.selectedCategory === 'All' || p.categoryName === state.selectedCategory)
            }
            return state.products;
        },

        productsByCategory(state, x: string) {

        },

        productById(state, id: number) {
            return state.products.filter(p => p.dbaseId === id);
        },

        categories(state): Category[] {
            return state.categories;
        },
        trueCategories(state): Category[] {
            return state.categories.filter(cat => cat.name != "All");
        },

        selectedCategory(state): string {
            return state.selectedCategory;
        },

        context(state): Context {
            //TODO: Moze to nie najlepsze wyjscie - do sprawdzenia
            if (localStorage.hasOwnProperty("User")) {
                state.context.currentUser = (JSON.parse(localStorage.getItem("User") as string)) as User;
            }
            return state.context;
        },
        storedProduct(state): Product | undefined {
            return state.storedProduct;
        },
        actualProductId(state) {
            return state.storedProduct;
        },
        actualAlert(state) {
            return state.actualAlert;
        },

        //for admin
        users(state) {
            return state.users;
        }

    },
    mutations: {
        addProducts(currentState: StoreState, products: Product[]) {
            currentState.products = products;
        },
        addFavouriteProducts(currentState: StoreState, favouriteProducts: Product[]) {
            currentState.favouriteProducts = favouriteProducts;
        },
        selectCategory(currentState: StoreState, selectedCategory: string) {
            currentState.selectedCategory = selectedCategory;

        },
        addCategories(currentState: StoreState, categories: Category[]) {
            currentState.categories = [new Category(0, 0, "All", "")];
            currentState.categories.push(...categories);
        },
        addStoredProduct(currentState: StoreState, product: Product) {
            console.log(product);
            currentState.storedProduct = product;
        },

        setActualProductId(currentState: StoreState, id: number) {
            console.log(id);
            currentState.actualProductId = id;
        },

        loginUser(currentState: StoreState, data: LoginResponse | DefaultErrorResponse) {
            console.log("Tutaj");
            console.log(data);
            if ((data as LoginResponse)?.tokenData) {
                data = data as LoginResponse;
                currentState.context.currentJWT = data.tokenData.token; //save JWT to store
                currentState.context.currentUser = data.user //save user to store
                localStorage.setItem("User", JSON.stringify(data.user)); //save user to cookies
                localStorage.setItem("JWT", data.tokenData.token); //save jwt to cookies
                console.log(Context.getInstance());
            } else {
                console.log("I have NO token for you... looser!");
            }
        },

        addTemporaryEmailToUser(currentState: StoreState, email: string) {
            currentState.context.currentUser = new User(0, "", email, "", "", "", "", "", "");
        },

        addUsers(currentState: StoreState, users: User[]) {
            console.log(users);
            currentState.users = users;
        },
        setActualAlert(currentState: StoreState, alert: Alert) {
            currentState.actualAlert = alert;
        },

        logout(currentState: StoreState) {
            currentState.context.currentUser = undefined;
            currentState.context.currentJWT = undefined;
            localStorage.removeItem("User");
            localStorage.removeItem("JWT");
        },


    },
    actions: {
        async loadProducts(context, task: () => Promise<Product[]>) {
            let data = await task();
            context.commit("addProducts", data);
        },

        async loadFavouriteProducts(context, task: () => Promise<Product[]>) {
            const data = await task();
            context.commit("addFavouriteProducts", data);
        },

        async loadStoredProduct(context, task: () => Promise<Product>) {
            let data = await task();
            context.commit("addStoredProduct", data);
        },

        async loadUsers(context, task: () => Promise<User[]>) {
            let data = await task();
            context.commit("addUsers", data);
        },
        async loadCategories(context, task: () => Promise<Category[]>) {
            let data = await task();
            context.commit("addCategories", data);
        },

        async login(context, task: () => Promise<Context>) {
            let data = await task();
            context.commit("loginUser", data);
        },

        async loadUserByEmail(context, task: () => Promise<User>) {

        },

        async register(context, task: () => Promise<Object>) {
            let data = await task();
            // register nie odwoluje sie do mutacji, poniewaz efekt wywołania nie jest przechowywany
        },

        async addProduct(context, task: () => Promise<AddProductResponse>) {
            let data = await task();
        },


    },
    modules: {}
})
