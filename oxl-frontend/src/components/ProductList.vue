<template>
    
    <div class="d-flex flex-wrap p-2 m-2 align-items-center justify-content-around"> 
        <ProductItem v-for="p in products" v-bind:key="p.dbaseId" v-bind:product="p" />
    </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ProductItem from './ProductItem.vue';
import { Product } from '@/data/entities';
import { useStore } from 'vuex';
import { mapMutations, mapState, mapGetters } from 'vuex';
import { StoreState } from '@/store';

export default defineComponent({
    name: "ProductList",
    components: {ProductItem},
    computed: {
        ...mapState<StoreState>({
            selectedCategory: (state: StoreState) => state.selectedCategory,
            context: (state: StoreState) => state.context,
            products: (state: StoreState) => state.products
        }),

        ...mapGetters(["products", "selectedCategory", "context"])

    },
    methods:{
        ...mapMutations({
            handleSelectedCategory: "selectCategory"
        })
    },
    

})

</script>