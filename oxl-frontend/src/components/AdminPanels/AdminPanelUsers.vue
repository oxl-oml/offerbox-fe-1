<template>
   <h5>Zarządzanie użytkownikami</h5>
    <table class="interactive-table" v-if="users">

        <tr>
            <th v-for="key in Object.keys((users[0]) as User)" :key="key">
                {{ key }}
            </th>
        </tr>

        <tr v-for="user in users" :key="user?.dbaseId">
            <td v-for="val in Object.values((user as User))">
                {{ val }}
            </td>
        </tr>

    </table>
   

</template>


<script lang="ts">
import { HttpHandler } from '@/data/httpHandler';
import store from '@/store';
import { defineComponent, onMounted } from 'vue';
import { mapGetters, useStore, mapState } from 'vuex';
import { User } from '@/data/entities';
import { StoreState } from '@/store';

export default defineComponent({
    setup(){
        return {store: useStore()}
    },
    name: "AdminPanelUsers",
    data(){

        const httpHandler = new HttpHandler();

        onMounted(()=> {
            store.dispatch("loadUsers", httpHandler.loadUsers);
        })
    },
    computed:{
        ...mapState<StoreState>({
            users: (state: StoreState) => state.users
            
        }),
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