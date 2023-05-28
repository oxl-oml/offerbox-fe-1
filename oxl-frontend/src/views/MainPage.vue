<!-- Strona główna -->

<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>

        <div class="row flex-nowrap">
            <div class="col-auto col-md-2 bg-light d-flex flex-column align-items-center"> 
                <CategoryList :categories=categories @selectCategory="handleSelectedCategory"/>
            </div>

            <div class="col-md-10">
                <ProductList :products=products />
            </div>

        </div>

    </div>

    {{ console.log(categories) }}
</template>


<script lang="ts">
import Header from '@/components/Header.vue';
import ProductList from '@/components/ProductList.vue';
import { defineComponent, onMounted, PropType } from 'vue';
import { HttpHandler } from '@/data/httpHandler';
import { Category, User } from '@/data/entities';
import { useStore } from 'vuex';
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
            products: (state: StoreState) => state.products,
            categories: (state: StoreState) => state.categories,
            selectedCategory: (state: StoreState) => state.selectedCategory,
            context: (state: StoreState) => state.context
        }),

        ...mapGetters(["products", "categories", "selectedCategory", "context"])

    },
    methods:{
        handleSelectedCategory(cName: string){
            this.selectedCategory = cName;
        }
    }
    
})


</script>


<style>
#main-element{
    user-select: none;
}
</style>