<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block ">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>
    </div>
    <div class="container-md justify-content-center my-4">
        <div class="product-top-bar row">
            <h3>{{ product.name }}</h3>
            <h5>{{ product.fixedPrice}}</h5>
        </div>
        <div class="product-gallery">

        </div>
        <div class="row">
            <div class="product-description col-sm-12 col-md-8">
                <h5>Informacje o produkcie</h5>
                <p>{{ product.description }}</p>
            </div>
            <div class="product-owner col-sm-12 col-md-4">
                <h5>Informacje o sprzedającym</h5>
                <p>{{ product.ownerId }}</p>
            </div>
        </div>
        
    </div>

</template>


<script lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import { Product } from '@/data/entities';
import { defineComponent, onMounted, PropType } from 'vue';
import Header from '@/components/Header.vue';
import { HttpHandler } from '@/data/httpHandler';

//import { Carousel, Slide } from 'vue-carousel';

export default defineComponent({
    name: 'ProductPage',
    components: {Header},
    props: {
        product: {
            type: Object as PropType<Product>,
            //type: number;
            required: true
        }
    },
})

</script>

<style>
.product-description{
    background-color: antiquewhite;
}
.product-owner {
    background-color: azure;
}

</style>