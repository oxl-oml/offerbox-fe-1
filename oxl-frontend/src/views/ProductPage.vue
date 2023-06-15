<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block ">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>
    </div>
    <div v-if="productById" class="container-md justify-content-center my-4 bg-light rounded">
    <div class="product-top-bar row p-3">
        <div class="col-md-8">
            <h3>{{ productById?.name }}</h3>
            <h5>{{ `${productById?.price} zł` }}</h5>
        </div>
        <div class="col-md-4 d-flex align-items-center justify-content-end">
            <img :src="testowe" alt="User avatar"
                class="rounded-circle img-fluid object-fit-cover" style="width: 64px; height: 64px;"/>
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
            <p>{{ productById?.ownerId }}</p>
            <p>{{ productsByUser?.username }}</p>
            <p>{{ productsByUser?.phoneNumber }}</p>
        </div>
    </div>
</div>

    <div v-else>
        <p>Nie znaleziono produktu.</p>

        
    </div>
</template>


<script lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import {Product, AccountStatus, Alert, AlertTypes, DefaultErrorResponse, User, UserAccountStatus} from "@/data/entities";
import { defineComponent, onMounted, PropType } from 'vue';
import Header from '@/components/Header.vue';
import { HttpHandler } from '@/data/httpHandler';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { StoreState } from '@/store';
import { useStore } from 'vuex';
import ImageSlider from '@/components/ImageSlider.vue';
import Footer from '@/components/Footer.vue';


//import { Carousel, Slide } from 'vue-carousel';

export default defineComponent({
    name: 'ProductPage',
    setup(){
        return {store: useStore()};
    },
    components: { Header, ImageSlider, Footer },
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
        ...mapGetters(["productsByUser"]),
        ...mapGetters(["users"]),
        ...mapGetters(["context"])
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


</style>