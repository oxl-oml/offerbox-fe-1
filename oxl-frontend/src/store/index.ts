import { createStore } from 'vuex'
import {User, Product, Category, LoginResponse, Alert} from '@/data/entities'
import { Context } from '@/data/context';




export interface StoreState {
  products: Product[],     //store products
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
    categories: [],
    selectedCategory: 'All',
    context: Context.getInstance(),
    storedProduct: new Product("", "", "", 0, 0, 0, 0, []),
    users: [],
    selectedAdminOption: "",

  },
  getters: {
    products(state, category?): Product[]{
      if(category){
        console.log(state.selectedCategory);
        return state.products.filter( p => state.selectedCategory === 'All' || p.categoryName === state.selectedCategory )
      }
      return state.products;
    },

    productsByCategory(state, x: string){
     
    },

    productById(state, id: number){
      return state.products.filter( p => p.dbaseId === id);
    },

    categories(state): Category[]{
      return state.categories;
    },
    selectedCategory(state): string{
      return state.selectedCategory;
    },
    context(state){
      return state.context;
    },
    storedProduct(state){
      return state.storedProduct;
    },
    actualProductId(state){
      return state.storedProduct;
    },
    actualAlert(state){
      return state.actualAlert;
    },

    //for admin
    users(state){
      return state.users;
    }



  },
  mutations: {
    addProducts(currentState: StoreState, products: Product[]){
      currentState.products = products;
    },
    selectCategory(currentState: StoreState, selectedCategory: string){
      currentState.selectedCategory  = selectedCategory;
     
    },
    addCategories(currentState: StoreState, categories: Category[]){
      currentState.categories = [new Category(0,0,"All","")];
      currentState.categories.push(...categories);
    },
    addStoredProduct(currentState: StoreState, product: Product){
      console.log(product);
      currentState.storedProduct = product;
    },

    setActualProductId(currentState: StoreState, id: number){
      console.log(id);
      currentState.actualProductId = id;
    },

    loginUser(currentState: StoreState, data: LoginResponse){
      //console.log(data);
      if(data?.tokenData.token === null){
        console.log("I have NO token for you... looser!");
      }
      else{   
        currentState.context.currentJWT = data?.tokenData.token; //save JWT to store
        currentState.context.currentUser = data?.user //save user to store
        console.log(Context.getInstance().currentJWT);
        localStorage.setItem("User", JSON.stringify(data.user));
        localStorage.setItem("JWT", data.tokenData.token);
        
      }
    },

    addTemporaryEmailToUser(currentState: StoreState, email: string){
      currentState.context.currentUser = new User(0, "", email, "", "", "", "", "", "");
    },

    addUsers(currentState: StoreState, users: User[]){
      console.log(users);
      currentState.users = users;
    },
    setActualAlert(currentState: StoreState, alert: Alert){
      currentState.actualAlert = alert;
    }

  },
  actions: {
    async loadProducts(context, task: () => Promise<Product[]>){
      let data = await task();
      context.commit("addProducts", data);
    },

    async loadStoredProduct(context, task: () => Promise<Product>){
      let data = await task();
      context.commit("addStoredProduct", data);
    },

    async loadUsers(context, task: () => Promise<User[]>){
      let data = await task();
      context.commit("addUsers", data);
    },
    async loadCategories(context, task: () => Promise<Category[]>){
      let data = await task();
      context.commit("addCategories", data);
    },

    async login(context, task: () => Promise<Context>){
      let data = await task();
      context.commit("loginUser", data);
    },

    async loadUserByEmail(context, task: () => Promise<User>){

    },

    async register(context, task: () => Promise<Object>){
      let data = await task();
      // register nie odwoluje sie do mutacji, poniewaz efekt wywołania nie jest przechowywany
    }
  },
  modules: {
  }
})
