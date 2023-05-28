<template>
    <RouterLink :to="{ path: '/products/'+product?.dbaseId}" class="product-container p-0 m-4 shadow rounded">
        <img src="../assets/samples/3.jpg" class="img-fluid m-0 p-0 rounded" />
        <div class="bottom-bar d-flex align-items-start justify-content-between p-2 bg-secondary">
            <h6>{{ product?.name }}</h6>
            <h6>{{ product?.fixedPrice }}</h6>
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
            type: Object as PropType<Product>,
            reqiured: true
        }
    },
    methods: {
        getImageUrl(): string[] {
            return this.product?.imageURL ? this.product.imageURL : [];
        }
    }
    
})

</script>


<style>
.product-container{
    width: 350px;
    height: 300px;
    color: white;
    text-decoration: none;
    overflow: hidden;
}


.bottom-bar:hover{
    margin-top: -50%;
    transition: all 0.5s;
    opacity: 0.9;
    transition-timing-function: ease-in-out;
    -webkit-transition-timing-function: ease-in-out;
    
}


.bottom-bar{
    position: relative;
    height: inherit;
    
}

</style>