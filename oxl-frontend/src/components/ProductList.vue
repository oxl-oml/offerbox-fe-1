<template>
    


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

        [1,2,3,4,5].map(x => products.push(new Product(`Prod${x}`, `Desc${x}`, `Cat${x%3}`, (x*1000)+22, x, x, x*10)));
    }

})

</script>