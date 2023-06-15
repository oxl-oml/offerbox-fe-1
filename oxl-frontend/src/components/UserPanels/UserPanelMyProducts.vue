<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Kategoria</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productsByUser" :key="product.dbaseId">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.categoryName }}</td>
            <td>{{ `${product.price} zł` }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { HttpHandler } from '@/data/httpHandler';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    name: 'UserPanelMyProducts',
    setup() {
      const httpHandler = new HttpHandler();
      const store = useStore();
  
      onMounted(() => {
        store.dispatch('loadProducts', httpHandler.loadProductsByUser);
      });
  
      return {
        productsByUser: store.getters.productsByUser,
      };
    },
  });
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  