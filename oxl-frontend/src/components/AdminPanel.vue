<template v-if="">
    <div class="row p-2 mt-4">
                <div class="col-md-3">
                    <h5>Zadania administracyjne</h5>

                    <div v-for="item in menuItems" class="d-flex direction-row" >

                        <button class="btn btn-white" v-on:click="clickItem(item)">{{ item }}</button>

                    </div>

                </div>

                <div class="col-md-9">
                    <AdminPanelUsers v-if="selected == 'Users'" />
                </div>
    </div>

</template>


<script lang="ts">
import { defineComponent } from 'vue';
import AdminPanelUsers from '../components/AdminPanels/AdminPanelUsers.vue';
import { Context } from '@/data/context';



export default defineComponent({
    name: "AdminPanel",
    components: {AdminPanelUsers},
    data() {
        let menuItems : Array<string> = ['Users', 'Categories', 'Products'];
        let selected: string = menuItems[0];
        return {menuItems, selected};
   },

   methods:{
    clickItem(item: string): void{
        this.selected = item;
    }
   }


});

</script>