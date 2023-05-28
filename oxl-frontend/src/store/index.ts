import { createStore } from 'vuex'
import {User, Product, Category} from '@/data/entities'

export interface StoreState {
  products: Product[],
  categories: Category[],
  selectedCategory: string

}

export default createStore<StoreState>({
  state: {
    products: [new Product("Rower miejski składany", "Lorem ipsum", "Sport", 678, 1, 1, 1001, [])],
    categories: [],
    selectedCategory: 'All'

  },
  getters: {
    products(state){
      return state.products;
    },
    categories(state){
      return state.categories;
    },
    selectedCategory(state){
      return state.selectedCategory;
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
    }
    
  },
  modules: {
  }
})
