<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block ">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>
    </div>
    <div v-if="productById" class="container-md justify-content-center my-4 bg-light rounded">
        <div class="product-top-bar row p-3">
            <div class="col-sm-8">
                <h3>{{ productById?.name }}</h3>
                <h5>{{ `${productById?.price} zł` }}</h5>
            </div>
            <div class="col-sm-4 d-flex justify-content-end align-items-center">
                <i class="bi bi-star custom-icon" :title="true?'Kliknij aby dodać do ulubionych':'Kliknij aby usunąć z ulubionych'"></i>
            </div>
        </div>
        <div class="row product-gallery">
            <ImageSlider :images="productById?.imageURL" class="col-md-8 d-flex justify-content-center align-items-center"/>
        </div>
        <div class="row">
            <div class="product-description col-sm-12 col-md-8 p-4">
                <h5>Informacje o produkcie</h5>
                <p>{{ productById?.description }}</p>
            </div>
            <div class="product-owner col-sm-12 col-md-4 p-4">
                <h5>Informacje o sprzedającym</h5>
                <SellerDetails />
                <p>{{ productById?.ownerId }}</p>
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
import SellerDetails from '@/components/SellerDetails.vue';

//import { Carousel, Slide } from 'vue-carousel';

export default defineComponent({
    name: 'ProductPage',
    setup(){
        return {store: useStore()};
    },
    components: { Header, ImageSlider, SellerDetails },
    data(){
        const store = useStore();
        const httpHandler = new HttpHandler();
        onMounted(()=> {
            //store.dispatch("loadStoredProduct", httpHandler.loadStoredProduct)
            //store.dispatch("loadProduct", httpHandler.loadProductById)
        })

        return {
            productId: 0,
        }
    },
    computed:{
        ...mapGetters(["productById"]),

        
    },
    methods:{
        ...mapMutations({
            setActualProductId: "setActualProductId"
        }),

    },
    beforeMount(){
        var path: string = this.$route.path;
        this.productId = parseInt(path.substring(path.lastIndexOf('/')+1, path.length));
        this.setActualProductId(this.productId);
    },
    mounted() {
        if(!this.productById){
            const httpHandler: HttpHandler = new HttpHandler();
            this.store.dispatch("loadProduct", httpHandler.loadProductById)
        }
    },
    
})

</script>

<style>
.custom-icon{
    font-size: 30px;
}

.custom-icon:hover{
    color:gold;
    animation: all ease-in-out;
}

</style>