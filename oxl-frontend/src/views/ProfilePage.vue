<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block ">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>
    </div>
    <div v-if="userData" class="container-fluid">
        
        {{ userData }}
        <UserPanel />
    </div>
    <div v-else>
        <p>Brak danych. Użytkownik nie istnieje w bieżącej sesji.</p>
    </div>


</template>


<script lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import { Product } from '@/data/entities';
import { defineComponent, onMounted, PropType } from 'vue';
import Header from '@/components/Header.vue';
import { HttpHandler } from '@/data/httpHandler';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { StoreState } from '@/store';
import { useStore } from 'vuex';
import { User } from '@/data/entities';
import UserPanel from '@/components/UserPanel.vue';


//Punkty
//1. Pobranie usera ze stora
//2. Wstawienie danych do formularza
//3. Po kliknieciu "zapisz" wyslanie danych postem w celu edycji
//4. Pobranie aktualnych

export default defineComponent({
    name: 'ProfilePage',
    setup(){
        return {store: useStore()};
    },
    components: { Header, UserPanel },
    data(){
        const store = useStore();
        const httpHandler = new HttpHandler();
        onMounted(()=> {
            
        })
    },
    computed:{
      userData(): User{
        //localStorage.setItem("User", JSON.stringify(new User(0,"JanJan", "Kowalski@wp.pl", "Jan", "Kowalski", "31343253", "none","USR","A")))
        var loggedUser: User = JSON.parse(localStorage.getItem("User") as string);
        return loggedUser;
      }
    },
    methods:{

    },
    
})

</script>

<style>

</style>