<!--Nagłówek-->

<template>
    <div class="p-2 d-flex flex-row align-items-center justify-content-between">
        <RouterLink to="/">
            <div id="image-place">
                <img src="../assets/logo/l1_low.png" width="50" class="img-thumbnail"/>
            </div>
        </RouterLink>

        <div id="actions-bar">
            Tutaj akcje tj. Dodaj produkt
        </div>

        <div id="notifications-bar">
            Tutaj powiadomienia tj. obserwowane produkty
        </div>

        <div id="account-bar">
            Tutaj akcje konta tj. wyświetl dane
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
   name:"Header",

});

</script>


