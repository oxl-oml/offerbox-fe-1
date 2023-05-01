<template>
    <RouterLink :to="{ path: '/products/'+product?.dbaseId}" class="product-container p-0 m-4 w-25 shadow rounded">
        <img src="../assets/samples/ferrari.jpg" class="img-fluid m-0 p-0" />
        <div class="bottom-bar d-flex align-items-center justify-content-between p-1 bg-secondary">
            <h4>{{ product?.name }}</h4>
            <h6>{{ `${product?.price.toFixed(2)} zł` }}</h6>
        </div>
    </RouterLink>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Product } from '@/data/entities';

export default defineComponent({
    name: "ProductItem",
    props: {
        product: {
            type: Object as PropType<Product>
        }
    }
    
})

</script>


<style>
.product-container{
    max-width: 1000px;
}

</style>