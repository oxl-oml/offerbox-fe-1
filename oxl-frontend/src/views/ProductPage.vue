<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block ">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>
    </div>
    <div v-if="storedProduct.dbaseId" class="container-md justify-content-center my-4">
        <div class="product-top-bar row">
            <h3>{{ storedProduct?.name }}</h3>
            <h5>{{ storedProduct?.price}}</h5>
        </div>
        <div class="product-gallery">

        </div>
        <div class="row">
            <div class="product-description col-sm-12 col-md-8">
                <h5>Informacje o produkcie</h5>
                <p>{{ storedProduct?.description }}</p>
            </div>
            <div class="product-owner col-sm-12 col-md-4">
                <h5>Informacje o sprzedającym</h5>
                <p>{{ storedProduct?.ownerId }}</p>
            </div>
        </div>
        
    </div>
    <div v-else>
        <p>Nie znaleziono produktu.</p>
    </div>


</template>


<script lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import { Product } from '@/data/entities';
import { defineComponent, onMounted, PropType } from 'vue';
import Header from '@/components/Header.vue';
import { HttpHandler } from '@/data/httpHandler';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { StoreState } from '@/store';
import { useStore } from 'vuex';

//import { Carousel, Slide } from 'vue-carousel';

export default defineComponent({
    name: 'ProductPage',
    setup(){
        return {store: useStore()};
    },
    components: {Header},
    data(){
        const store = useStore();
        const httpHandler = new HttpHandler();
        onMounted(()=> {
            store.dispatch("loadStoredProduct", httpHandler.loadStoredProduct)
        })
    },
    computed:{
        ...mapState<StoreState>({
            context: (state: StoreState) => state.context,
            products: (state: StoreState) => state.products,
            storedProduct: (state: StoreState) => state.storedProduct
        }),
        ...mapGetters(["productById", "products", "storedProduct"]),
        

    },
    methods:{
        ...mapMutations({
            handleStoredProduct: "addStoredProduct",
            setActualProductId: "setActualProductId"
        })
    },
    beforeMount(){
        var path: string = this.$route.path;
        var id =  path.substring(path.lastIndexOf('/')+1, path.length);
        this.setActualProductId(id);
    },
    beforeUnmount(){
        this.setActualProductId(0);
    }
    
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