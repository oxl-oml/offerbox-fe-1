<template>
    <div v-if="userById" class="d-flex flex-column justify-content-start align-items-start p-3 bg-rose">
        
        <div  class="w-100 d-flex justify-content-center align-items-center">
            <img :src="userById.profileImageUrl" alt="Avatar"
                    class="rounded-circle img-fluid object-fit-cover my-4 custom-image-3" />
        </div>
        <div class="custom-flexible-column">
            <b>Imię Nazwisko:</b>
            {{ `${userById.firstName} ${userById.lastName}` }}
        </div>
        <div>
            <b>Wystawionych przedmiotów:</b>
        </div>
        <div>
            <b>Średnia ocen:</b>
        </div>
    </div>
    <div v-else>
        <b>Aby wyświetlić informacje o sprzedającym musisz się zalogować!</b>
    </div>

</template>


<script lang="ts">
import { defineComponent, Prop } from 'vue';
import { PropType } from 'vue';
import { User } from '@/data/entities';
import { mapActions, mapGetters, mapMutations, useStore } from 'vuex';
import { HttpHandler } from '@/data/httpHandler';


export default defineComponent({
    name:"SellerDetails",
    props:{
        sellerDetails:{
            type: Object as PropType<User>,
            //required: true
        },
        sellerId:{
            type: Object as PropType<number>,
            required: true
        }
    },
    computed:{
        ...mapGetters(["userById"])
    },
    methods:{
        ...mapMutations({
            addUsers: "addUsers"
        }),
        ...mapActions(["login"])
    },
    beforeMount() {
        
    },
    mounted(){
        const httpHandler :HttpHandler = new HttpHandler();
        const store = useStore();

        this.login(()=> {
            return httpHandler.loadUserById(this.sellerId)
                .then((data) => {
                    console.log(data)
                    if((data as User).dbaseId)
                    {
                        this.addUsers([data]);
                    }

                    console.log(this.userById);
                })
                .catch()
        })

    }
})

</script>

<style>
.custom-flexible-column{
    display: flex;
    flex-direction: column;
}
.custom-image-3{
    width: 200px !important;
    height: 200px !important;
}

</style>