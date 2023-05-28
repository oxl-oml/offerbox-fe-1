<template>
    <div>
        <ul>
            <li v-for="cat in categories" v-bind:key="cat.dbaseId" v-on:click="selectCategory(cat.name)">{{ cat.name }}</li>
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
        }
    },
    methods:{
       selectCategory(cName: string){
            this.$emit("selectCategory", cName);
            console.log("Clicked:" + cName);
       }
    }
})

</script>