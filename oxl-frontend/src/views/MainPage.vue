<!-- Strona główna -->

<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>

        <div class="row flex-nowrap">
            <div class="col-auto col-md-2 bg-light d-flex flex-column align-items-center"> 
                <CategoryList v-bind:selectedCategory="selectedCategory" v-bind:categories=categories  @selectCategory="(cName) => handleSelectedCategory(cName)"/>
            </div>

            <div class="col-md-10">
                <ProductList/>
            </div>

        </div>

    </div>

</template>


<script lang="ts">
import Header from '@/components/Header.vue';
import ProductList from '@/components/ProductList.vue';
import { defineComponent, onMounted, PropType } from 'vue';
import { HttpHandler } from '@/data/httpHandler';
import { Category, User } from '@/data/entities';
import { mapMutations, useStore } from 'vuex';
import { mapState, mapGetters } from 'vuex';
import { StoreState } from '@/store';
import CategoryList from '@/components/CategoryList.vue';

export default defineComponent({
    name: "MainPage",
    setup(){
        return {store: useStore()};
    },
    components: { Header, ProductList, CategoryList },
    data(){
        const store = useStore();
        const httpHandler = new HttpHandler();
        onMounted(()=> {
            store.dispatch("loadProducts", httpHandler.loadProducts)
            store.dispatch("loadCategories", httpHandler.loadCategories)
        })
        
        
    },
    actions:{
        
    },
    computed: {
        ...mapState<StoreState>({
            categories: (state: StoreState) => state.categories,
            selectedCategory: (state: StoreState) => state.selectedCategory,
            context: (state: StoreState) => state.context,
            products: (state: StoreState) => state.products
        }),

        ...mapGetters(["products", "categories", "selectedCategory", "context"])

    },
    methods:{
 
        ...mapMutations({
            handleSelectedCategory: "selectCategory"
        })

        
    }
    
})


</script>


<style>
#main-element{
    user-select: none;
}
.app-wrapper {
    min-height: 100vh;
  }
</style>