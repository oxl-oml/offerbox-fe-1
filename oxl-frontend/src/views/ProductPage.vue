<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block ">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>
    </div>
    <div v-if="store.getters.productById(productId).dbaseId" class="container-md justify-content-center my-4 bg-light rounded">
        <div class="product-top-bar row p-3">
            <h3>{{ store.getters.productById(productId)?.name }}</h3>
            <h5>{{ `${productById(productId)?.price} zł` }}</h5>
        </div>
        <div class="row product-gallery">
            <ImageSlider :images="productById(productId)?.imageURL" class="col-md-8 d-flex justify-content-center align-items-center"/>
        </div>
        <div class="row">
            <div class="product-description col-sm-12 col-md-8 p-4">
                <h5>Informacje o produkcie</h5>
                <p>{{ productById(productId)?.description }}</p>
            </div>
            <div class="product-owner col-sm-12 col-md-4 p-4">
                <h5>Informacje o sprzedającym</h5>
                <p>{{ productById(productId)?.ownerId }}</p>
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
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { StoreState } from '@/store';
import { useStore } from 'vuex';
import ImageSlider from '@/components/ImageSlider.vue';

//import { Carousel, Slide } from 'vue-carousel';

export default defineComponent({
    name: 'ProductPage',
    setup(){
        return {store: useStore()};
    },
    components: { Header, ImageSlider },
    data(){
        const store = useStore();
        const httpHandler = new HttpHandler();
        onMounted(()=> {
           // store.dispatch("loadStoredProduct", httpHandler.loadStoredProduct)
        })

        return {
            productId: 0,
        }
    },
    computed:{
        ...mapGetters(["productById","products", "storedProduct"]),

        productByIdHelper(){
            return this.productById(this.productId);
        }
        

    },
    methods:{
        ...mapMutations({
            handleStoredProduct: "addStoredProduct",
            setActualProductId: "setActualProductId"
        }),

    },
    beforeMount(){
        var path: string = this.$route.path;
        this.productId = parseInt(path.substring(path.lastIndexOf('/')+1, path.length));
        this.setActualProductId(this.productId);
    },
    beforeUnmount(){
        this.setActualProductId(0);
    }
    
})

</script>

<style>


</style>