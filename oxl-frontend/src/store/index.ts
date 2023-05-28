import { createStore } from 'vuex'
import {User, Product, Category} from '@/data/entities'

export interface StoreState {
  products: Product[],
  categories: Category[],
  

}

export default createStore<StoreState>({
  state: {
    products: [new Product("Rower miejski składany", "Lorem ipsum", "Sport", 678, 1, 1, 1001, "")],
    categories: []
  },
  getters: {
    products(state){
      return state.products;
    }
  },
  mutations: {
    addProducts(currentState: StoreState, products: Product[]){
      currentState.products = products;
    }
  },
  actions: {
    async loadProducts(context, task: () => Promise<Product[]>){
      let data = await task();
    //  context.commit("addProducts", data);
    },
    async loadUsers(context, task: () => Promise<User[]>){
      let data = await task();
      context.commit("addProducts", data);
    }
  },
  modules: {
  }
})
