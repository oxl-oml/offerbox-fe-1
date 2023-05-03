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


        <div class="right-side-header d-flex flex-wrap">
            <div id="actions-bar" class="mx-4">
            <RouterLink to="/products/new" class="btn btn-primary text-white">
                Dodaj ogłoszenie
            </RouterLink>
            </div>
            <div id="notifications-bar" class="mx-4">
                <RouterLink to="/">
                    <img src="../assets/icons/messages.svg" class="img-icons-white mx-2 c-tooltip" />
                </RouterLink>
                <RouterLink to="/">
                    <img src="../assets/icons/unfilled-star.svg" class="img-icons-white mx-2"/>
                </RouterLink>
                <RouterLink to="/">
                    <img src="../assets/icons/notifications.svg" class="img-icons-white mx-2"/>
                </RouterLink>
            </div>

            <div id="account-bar" class="d-flex flex-row-reverse justify-content-between mx-4">
                <RouterLink to="/" v-if="user" :title="{}">
                    <img src="../assets/icons/my-account.svg" class="img-icons-white"/>
                </RouterLink>
                <LoginRegister to="/" v-else="user" />
                    
                
            </div>
        </div>
        



    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {Context} from '../data/context'
import { User } from '@/data/entities';
import LoginRegister from './LoginRegister.vue';

export default defineComponent({
    name: "Header",
    // data(){
    //     let u1 = new User(1, "Jan", "Kowalski", "L", "DD","43434343", "ddd", "user");
    //     return {user: u1};
    // },
    props: {
        user: {
            type: Object as PropType<User>
        }
    },
    computed: {
        loggeduser(): User | null {
            return this.user ? this.user : null;
        }
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


</style>

