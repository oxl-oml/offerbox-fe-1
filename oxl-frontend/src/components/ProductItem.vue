<template>
    <RouterLink :to="{ path: '/products/'+product?.dbaseId}" class="product-container p-0 m-4 shadow rounded">
        <img v-if="product?.imageURL[0]" :src="product?.imageURL[0]" class="img-fluid m-0 p-0 custom-img" @load="() => {isImageLoaded=true}" :hidden="!isImageLoaded"/>
        <img v-if="!product?.imageURL[0] || !isImageLoaded" src="http://trashv1.ct8.pl/media/No_Image_Available.jpg" class="img-fluid m-0 p-0 custom-img" />
        <div class="bottom-bar p-2 bg-secondary">
            <div class="d-flex align-items-start justify-content-between">
                <h6>{{ product?.name }}</h6>
                <h6>{{ (product?.price)?.toFixed(2) + ' zł'}}</h6>
            </div>
            <div>
                {{ product?.description }}
            </div>
        </div>
        
    </RouterLink>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Product } from '@/data/entities';

export default defineComponent({
    name: "ProductItem",
    data(){
        return{
            isImageLoaded: false,
        }
    },
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ghostwhite;
}


.bottom-bar:hover{
    transition: all 0.5s;
    opacity: 0.9;
    transition-timing-function: ease-in-out;
    -webkit-transition-timing-function: ease-in-out;
    bottom: 20%;
    
}


.bottom-bar{
    position: relative;
    min-height: 60%;
    width: 100%;
    bottom: 0%;
    z-index: 1;
}

.custom-img{
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%
}

</style>