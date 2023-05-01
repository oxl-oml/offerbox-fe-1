<!--Nagłówek-->

<template>
    <div class="p-2 d-flex flex-row align-items-center justify-content-between">
        <RouterLink to="/">
            <div id="image-place">
                <img src="../assets/logo/l1_low.png" width="50" class="img-thumbnail"/>
            </div>
        </RouterLink>

        <div id="actions-bar">
            <button class="btn btn-secondary text-white">
                Dodaj ogłoszenie
            </button>
        </div>

        <div id="notifications-bar">
            <RouterLink to="/">
                <img src="../assets/icons/messages.svg" class="img-icons-white"/>
            </RouterLink>
            <RouterLink to="/">
                <img src="../assets/icons/unfilled-star.svg" class="img-icons-white"/>
            </RouterLink>
            <RouterLink to="/">
                <img src="../assets/icons/notifications.svg" class="img-icons-white"/>
            </RouterLink>
        </div>

        <div id="account-bar" class="d-flex flex-row-reverse">
            <RouterLink to="/">
                <img src="../assets/icons/my-account.svg" class="img-icons-white"/>
            </RouterLink>
            
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
   name:"Header",

});

</script>


<style>
.img-icons-white{
    width: 50px;
    height: 50px;
    fill: black;
}



</style>

