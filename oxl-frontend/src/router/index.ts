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

//props: (route) => ({alert: {}, ...route.params}
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: MainPage},
  { path: '/products', redirect: "/"},
  { path: '/login', component: LoginPage},
  { path: '/login-force', redirect: '/login'},
  { path: '/register', component: RegistrationPage},
  { path: '/products/:id', component: ProductPage},
  { path: '/products:pathMatch(.*)*', redirect: "/" },
  { 
    path: '/products/new', 
    component: AddProduct,
    beforeEnter(to, form, next){
      if(!Context.getInstance().isLogged()){
        next("/login-force");
      }
      next();
    }
  },
  { 
    path: '/favourites', 
    component: FavPage,
    beforeEnter(to, form, next){
      if(!Context.getInstance().isLogged()){
        next("/login-force");
      }
      next();
    }
  },
  { 
    path: '/messages', 
    component: MessPage,
    beforeEnter(to, form, next){
      if(!Context.getInstance().isLogged()){
        next("/login-force");
      }
      next();
    }
  },
  { 
    path: '/admin', component: AdminPage,
    beforeEnter(to, form, next){
      if(!Context.getInstance().isAdmin()){
        next("/");
      }
      next();
    }
  },
  { 
    path: '/myprofile', component: ProfilePage,
    beforeEnter(to, form, next){
      if(!Context.getInstance().isLogged()){
        next("/");
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
