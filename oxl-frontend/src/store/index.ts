import { createStore } from 'vuex'
import {User, Product, Category} from '@/data/entities'
import { Context } from '@/data/context';

export interface StoreState {
  products: Product[],
  categories: Category[],
  selectedCategory: string,
  context: Context | null

}

export default createStore<StoreState>({
  state: {
    products: [new Product("Rower miejski składany", "Lorem ipsum", "Sport", 678, 1, 1, 1001, [])],
    categories: [],
    selectedCategory: 'All',
    context: null

  },
  getters: {
    products(state): Product[]{
      return state.products;
    },

    productsByCategory(state){
      return state.products.filter( p => state.selectedCategory === "All" || p.categoryName === state.selectedCategory)
    },

    categories(state): Category[]{
      return state.categories;
    },
    selectedCategory(state): string{
      return state.selectedCategory;
    },
    context(state){
      return state.context;
    }

  },
  mutations: {
    addProducts(currentState: StoreState, products: Product[]){
      currentState.products = products;
    },
    selectCategory(currentState: StoreState, selectedCategory: string){
      currentState.selectedCategory  = selectedCategory;
    }

  },
  actions: {
    async loadProducts(context, task: () => Promise<Product[]>){
      let data = await task();
      context.commit("addProducts", data);
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
