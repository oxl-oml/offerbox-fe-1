import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegistrationPage from '../views/RegistrationPage.vue'
import AddProduct from '../views/AddProduct.vue'
import ProductPage from '../views/ProductPage.vue'
import AdminPage from '../views/AdminPage.vue'
import FavPage from '@/views/FavPage.vue'
import MessPage from '@/views/MessPage.vue'
import { Context } from '@/data/context'
import ProfilePage from '@/views/ProfilePage.vue'
import { useStore } from 'vuex'
import store from '../store/index'
import { User } from '@/data/entities'
import { isAdmin } from '@/data/scripts/helper'
import { isLogged } from '@/data/scripts/helper'



const routes: Array<RouteRecordRaw> = [
  { path: '/', component: MainPage, meta:{title: "Offerbox"}},
  { path: '/products', redirect: "/"},
  { path: '/login-force', redirect: '/login'},
  { path: '/products/:id', component: ProductPage},
  { path: '/products:pathMatch(.*)*', redirect: "/" },
  { 
    path: '/register', 
    component: RegistrationPage,
    beforeEnter(to, form, next){
      
      if(isLogged()){
        next("/myprofile");
      }
      next();
    }
  },
  { 
    path: '/login', 
    component: LoginPage,
    beforeEnter(to, form, next){
      
      if(isLogged()){
        next("/myprofile");
      }
      next();
    }
  },
  { 
    path: '/products/new', 
    component: AddProduct,
    beforeEnter(to, form, next){
      
      if(!isLogged()){
        next("/login-force");
      }
      next();
    }
  },
  { 
    path: '/favourites', 
    component: FavPage,
    beforeEnter(to, form, next){
      if(!isLogged()){
        next("/login-force");
      }
      next();
    }
  },
  { 
    path: '/messages', 
    component: MessPage,
    beforeEnter(to, form, next){
      if(!isLogged()){
        next("/login-force");
      }
      next();
    }
  },
  { 
    path: '/admin', component: AdminPage,
    beforeEnter(to, form, next){
      if(!isAdmin()){
        console.log("Nie Admin")
        next("/");
      }
      next();
    }
  },
  { 
    path: '/myprofile', component: ProfilePage,
    beforeEnter(to, form, next){
      if(!isLogged()){
        next("/login-force");
      }
      next();
    }
  },

]
  


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router