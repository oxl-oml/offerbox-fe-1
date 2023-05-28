import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegistrationPage from '../views/RegistrationPage.vue'
import AddProduct from '../views/AddProduct.vue'
import ProductPage from '../views/ProductPage.vue'
import AdminPage from '../views/AdminPage.vue'
import FavPage from '@/views/FavPage.vue'
import MessPage from '@/views/MessPage.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: MainPage},
  { path: '/products', redirect: "/"},
  { path: '/login', component: LoginPage},
  { path: '/register', component: RegistrationPage},
  { path: '/products/new', component: AddProduct},
  { path: '/favourites', component: FavPage},
  { path: '/messages', component: MessPage},
  { path: '/admin', component: AdminPage},
  { path: '/products/:id', component: ProductPage},
  { path: '/products:pathMatch(.*)*', redirect: "/" },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
