<template>
    <div class="row p-2 mt-4 h-100">
                <div class="col-sm-4 col-md-2 bg-light">
                    <h5>Witaj {{ userData.firstName }}!</h5>

                    <ul class="list-group h-100">
                        <li v-for="item in menuItems" class="list-group-item custom-list-item bg-light" v-on:click="clickItem(item)">
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <div class="col-sm-12 col-md-12 col-xl-10">
                    
                </div>
    </div>

</template>


<script lang="ts">
import { defineComponent } from 'vue';
import AdminPanelUsers from '../components/AdminPanels/AdminPanelUsers.vue';
import { Context } from '@/data/context';
import { User } from '@/data/entities';


export default defineComponent({
    name: "UserPanel",
    components: {AdminPanelUsers},
    data() {
        let menuItems : Array<string> = ['Moje konto', 'Moje produkty', 'Moje ulubione'];
        let selected: string = menuItems[0];
        return {menuItems, selected};
   },

   methods:{
    clickItem(item: string): void{
        this.selected = item;
    }
   },
   computed:{
      userData(): User{
        //localStorage.setItem("User", JSON.stringify(new User(0,"JanJan", "Kowalski@wp.pl", "Jan", "Kowalski", "31343253", "none","USR","A")))
        var loggedUser: User = JSON.parse(localStorage.getItem("User") as string);
        return loggedUser;
      }
    },


});

</script>

<style>
.custom-list-item{
    cursor: pointer;
    border-top: 3px !important;
    border-bottom: 3px !important;
    border-left: 0px !important;
    border-right: 0px !important;
}

.custom-list-item:hover{
    background-color: gold !important;
}

.selected-category{
    background-color: aqua !important;
}
</style>