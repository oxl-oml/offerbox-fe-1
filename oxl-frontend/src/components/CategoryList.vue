<template>
    <div class="w-100">
        <h5 class="pt-4" >Wybierz kategorię</h5>
        <ul class="list-group h-100" >
            <li :class="{'selected-category': (cat.name == selectedCategory)}" class="list-group-item custom-list-item" v-for="cat in categories" v-bind:key="cat.dbaseId" v-on:click="selectCategory(cat.name)">{{ cat.name }}</li>
        </ul>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HttpHandler } from '@/data/httpHandler';
import { mapGetters, mapState } from 'vuex';
import { useStore } from 'vuex';
import { Category } from '@/data/entities';
import { PropType } from 'vue';

export default defineComponent({
    name:"CategoryList",
    props:{
        categories: {
            type: Object as PropType<Category[]>,
            required: true
        },
        selectedCategory:{
            type: Object as PropType<string>,
            required: true
        }
    },
    methods:{
       selectCategory(cName: string){
            this.$emit("selectCategory", cName);
       },
    }
})

</script>

<style>

.custom-list-item{
    cursor: pointer;
}

.custom-list-item:hover{
    background-color: gold;
}

.selected-category{
    background-color: aqua !important;
}

</style>