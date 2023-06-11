<!--Nagłówek-->

<template>
    <div class="p-2 d-flex flex-row align-items-center justify-content-between ">
        <div class="lef-side-header">
            <RouterLink to="/">
                <div id="image-place">
                    <img src="../assets/logo/l1_low.png" width="50" class="img-thumbnail"/>
                </div>
            </RouterLink>
        </div>


        <div class="right-side-header d-flex flex-wrap align-items-center">
            <div id="actions-bar" class="mx-4" v-if="context.currentUser">
            <RouterLink to="/products/new" class="btn btn-primary text-white">
                Dodaj ogłoszenie
            </RouterLink>
            </div>
            <div id="notifications-bar" class="mx-4" v-if="context.currentUser">
                <RouterLink to="/messages">
                    <img src="../assets/icons/messages.svg" class="img-icons-white mx-2 c-tooltip" />
                </RouterLink>
                <RouterLink to="/favourites">
                    <img src="../assets/icons/unfilled-star.svg" class="img-icons-white mx-2 c-tooltip"/>
                </RouterLink>
                <RouterLink to="/">
                    <img src="../assets/icons/notifications.svg" class="img-icons-white mx-2 c-tooltip"/>
                </RouterLink>
            </div>
            <span class="mx-4" v-if="!context.currentUser">
                Zaloguj się, aby korzystać ze wszystkich funkcjonalności serwisu!
            </span>
            <div id="account-bar" class="d-flex flex-row-reverse justify-content-between mx-4">
                <RouterLink to="/myprofile" v-if="context.currentUser" :title="`${context.currentUser.firstName} ${context.currentUser.lastName}`">
                    <img v-if="context.currentUser.profileImageUrl && isImgLoaded" :src="context.currentUser.profileImageUrl" class="img-icons-white c-tooltip" @load="() => {isImgLoaded = true}" />
                    <img v-if="!context.currentUser.profileImageUrl || !isImgLoaded" src="../assets/icons/my-account.svg" class="img-icons-white c-tooltip"/>
                </RouterLink>
                <LoginRegister to="/" v-else="context.currentUser" />

            </div>
        </div>
        



    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '@/data/entities';
import LoginRegister from './LoginRegister.vue';
import { mapGetters } from 'vuex';
import { useStore } from 'vuex';
import { Context } from '@/data/context';

export default defineComponent({
    setup(){
        return {
            store : useStore(),
            isImgLoaded: false
        }
    },
    name: "Header",
    props: {
        user: {
            type: Object as PropType<User>
        }
    },
    computed: {
        loggeduser(): User | null {
            return this.user ? this.user : null;
        },

        ...mapGetters(["context","currentUser"])
    },
    methods:{
        
    },
    components: { LoginRegister }
});

</script>


<style>
.img-icons-white{
    width: 35px;
    height: 35px;
    fill: black;

}
.c-tooltip{
    position: relative;
}

.c-tooltip:after{
    content: " ";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 5px;
    left: 5px;
    margin-top: 100%;
    background-color: black;
}

.c-tooltip:hover{
    filter: invert(44%) sepia(87%) saturate(2151%) hue-rotate(163deg);
    transition: all 0.2s ease;
}


</style>

