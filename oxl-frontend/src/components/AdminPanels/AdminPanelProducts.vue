<template>
    <h5> <i class="bi bi-cart-check-fill"></i> Zarządzanie produkatami</h5>
     <table class="interactive-table" v-if="products[0]">
 
         <tr>
             <th>
                 Manage
             </th>
             <th v-for="key in Object.keys((products[0]) as User)">
                 {{ key }}
             </th>
         </tr>
 
         <tr v-for="user in products" :key="user?.dbaseId" >
             <td>
                 <RouterLink :to="{path: 'admin/products/edit/'+user?.dbaseId}">Edit</RouterLink>
                 <RouterLink :to="{path: 'admin/products/delete/'+user?.dbaseId}">Delete</RouterLink>
             </td>
             <td v-for="val in Object.values((user as User))" :title="val" :contenteditable="val.key != 'ddBaseId'">
                 {{ formatValue(val) }}
             </td>
         </tr>
 
     </table>
    
 
 </template>
 
 
 <script lang="ts">
 import { HttpHandler } from '@/data/httpHandler';
 import store from '@/store';
 import { defineComponent, onMounted } from 'vue';
 import { mapGetters, useStore, mapState } from 'vuex';
 import { User } from '@/data/entities';
 import { StoreState } from '@/store';
 
 export default defineComponent({
     setup(){
         return {store: useStore()}
     },
     name: "AdminPanelProducts",
     data(){
 
         const httpHandler = new HttpHandler();
 
         onMounted(()=> {
             store.dispatch("loadProducts", httpHandler.loadProducts);
         })
     },
     computed:{
         ...mapState<StoreState>({
             products: (state: StoreState) => state.products
             
         }),
         ...mapGetters(["products"])
     },
     methods:{
         formatValue(val: string): string{
             if(val.length > 20){
                 return `${val.substring(0,19)}...`
             }
             return val;
         }
     }
 });
 
 
 </script>
 
 <style>
 .interactive-table{
     overflow: scroll;
     position: relative;
     left: 0;
     right: 0;
     font-size: small;
 }
 
 .interactive-table th, td{
     border-collapse: collapse;
     border: 2px solid grey;
     padding: 4px;
     
 }
 
 .interactive-table td{
     max-width: 600px
 }
 
 .interactive-table tr:nth-child(2n){
     background-color:gainsboro;
 }
 
 </style>