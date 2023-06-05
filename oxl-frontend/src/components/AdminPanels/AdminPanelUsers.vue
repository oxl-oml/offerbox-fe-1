<template>
   <h5>Zarządzanie użytkownikami</h5>
    <table class="interactive-table col-xl-8">

        <tr>
            <th v-for="key in Object.keys((users[0]))">
                {{ key }}
            </th>
        </tr>

        <tr v-for="user in users" v-bind:key="user.dbaseId">
            <td v-for="val in Object.values((user))">
                {{ val }}
            </td>
        </tr>

    </table>
   

</template>


<script lang="ts">
import { HttpHandler } from '@/data/httpHandler';
import store from '@/store';
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import { User } from '@/data/entities';

export default defineComponent({
    setup(){
        return {store: useStore()}
    },
    name: "AdminPanelUsers",
    data(){

        const httpHandler = new HttpHandler();

        store.dispatch("loadUsers", httpHandler.loadUsers);
    },
    computed:{
        ...mapGetters(["users"])
    }


});

</script>

<style>
.interactive-table{
    border-radius: 50%;
}

.interactive-table th, td{
    border-collapse: collapse;
    border: 2px solid grey;
    padding: 4px;
    
}

</style>