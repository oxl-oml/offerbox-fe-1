<template>
    <div>
        <table>
            {{ productsByUser }}
        </table>
    </div>

</template>


<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Context } from '@/data/context';
import { User } from '@/data/entities';
import { mapGetters, Store } from 'vuex';
import { HttpHandler } from '@/data/httpHandler';
import { useStore } from 'vuex';


export default defineComponent({
    name: "UserPanelMyProducts",
    data(){
        return {store: useStore()};
    },
    setup(){
        const httpHandler: HttpHandler = new HttpHandler();
        const store = useStore();

        onMounted(() => {
            store.dispatch("loadProducts", httpHandler.loadProductsByUser);
        })
    },
    computed:{
        ...mapGetters(["context","productsByUser"])
    },


});

</script>

<style>

</style>