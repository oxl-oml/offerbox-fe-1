<!-- Strona główna -->

<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>

        <div class="row flex-nowrap">
            <div class="col-auto col-md-2 bg-light d-flex flex-column align-items-center"> 
                Tutaj kategorie 
            </div>

            <div class="col-md-10">
                <ProductList />
            </div>

        </div>

    </div>
</template>


<script lang="ts">
import Header from '@/components/Header.vue';
import ProductList from '@/components/ProductList.vue';
import { defineComponent, onMounted, PropType } from 'vue';
import { HttpHandler } from '@/data/httpHandler';
import { User } from '@/data/entities';
import { useStore } from 'vuex';


export default defineComponent({
    name: "MainPage",
    setup(){
        return {store: useStore()};
    },
    components: { Header, ProductList },
    data(){
        const store = useStore();
        const httpHandler = new HttpHandler();
        onMounted(()=> store.dispatch("loadProducts", httpHandler.loadProducts))
        
    },
    actions:{
        
    }
    
})

</script>


<style>
#main-element{
    user-select: none;
}
</style>