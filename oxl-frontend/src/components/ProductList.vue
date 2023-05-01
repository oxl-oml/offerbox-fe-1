<template>
    
    <div class="d-flex flex-wrap p-2 m-2 align-items-center justify-content-around"> 
        <ProductItem v-for="p in products" v-bind:key="p.dbaseId" v-bind:product="p" />
    </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ProductItem from './ProductItem.vue';
import { Product } from '@/data/entities';

export default defineComponent({
    name: "ProductList",
    components: {ProductItem},
    data() {
        const products: Product[] = [];

        [1,2,3,4,5,6,7,8,9,10,11].map(x => products.push(new Product(`Prod${x}`, `Desc${x}`, `Cat${x%3}`, x, x, x, x*10)));
        return {
            products
        };
    },
    computed: {
        computedCategories(): string[]{
            return ["Wszystkie", ...new Set<string>(this.products.map(p => p.categoryName))]
        }
    }

})

</script>