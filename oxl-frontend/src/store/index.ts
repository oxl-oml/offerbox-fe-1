import { createStore } from 'vuex'
import {User, Product, Category, LoginResponse} from '@/data/entities'
import { Context } from '@/data/context';




export interface StoreState {
  products: Product[],     //store products
  categories: Category[],  //store all categories
  selectedCategory: string,//store selected category
  context: Context,       //store user data like JWT
  storedProduct?: Product, //store product in /product/id page
  actualProductId?: number,//store id catched from url
  

  //admin
  users: User[],
  selectedAdminOption: "",



}

export default createStore<StoreState>({
  state: {
    products: [new Product("Rower miejski składany", "Lorem ipsum", "Sport", 39.990000000000002, 1, 1, 1001, [])],
    categories: [new Category(0,0,"All","")],
    selectedCategory: 'All',
    context: Context.getInstance(),
    storedProduct: new Product("Rower miejski składany", "Lorem ipsum", "Sport", 39.990000000000002, 1, 1, 1001, []),
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
      console.log(data);
      currentState.context.currentJWT = data.token;
      console.log(Context.getInstance().currentJWT);
    },

    addUsers(currentState: StoreState, users: User[]){
      console.log(users);
      currentState.users = users;
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
    }
    
  },
  modules: {
  }
})
