<template>
    <h5> <i class="bi bi-bookmarks-fill"></i> Zarządzanie Kategoriami</h5>
     <table class="interactive-table" v-if="categories[0]">
 
         <tr>
             <th>
                 Manage
             </th>
             <th v-for="key in Object.keys((categories[0]) as User)">
                 {{ key }}
             </th>
         </tr>
 
         <tr v-for="user in categories" :key="user?.dbaseId" >
             <td>
                 <RouterLink :to="{path: 'admin/categories/edit/'+user?.dbaseId}">Edit</RouterLink>
                 <RouterLink :to="{path: 'admin/categories/delete/'+user?.dbaseId}">Delete</RouterLink>
             </td>
             <td v-for="val in Object.values((user as User))" :title="val" :contenteditable="val != 'ddBaseId'">
                {{ val }}
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
     name: "AdminPanelCategories",
     data(){
 
         const httpHandler = new HttpHandler();
 
         onMounted(()=> {
             store.dispatch("loadCategories", httpHandler.loadCategories);
         })
     },
     computed:{
         ...mapState<StoreState>({
             categories: (state: StoreState) => state.categories
             
         }),
         ...mapGetters(["categories"])
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