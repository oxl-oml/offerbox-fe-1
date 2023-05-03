<template>

</template>


<script lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import { Product } from '@/data/entities';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'ProductPage',
    props: {
        product: {
            type: Object as PropType<Product>,
            //type: number;
            required: true
        }
    },
    data() {
        let product = new Product("Rower miejski składany", "Lorem ipsum", "Sport", 678, 1, 1, 1001, "");
        return {
            product: product
        }
    }
})

</script>