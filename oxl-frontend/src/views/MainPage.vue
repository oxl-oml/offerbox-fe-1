<!-- Strona główna -->

<template>
    <div class="container-fluid h-100 d-inline-block">
        <div class="row bg-secondary sticky-top p-2">
            <Header />
        </div>

        <div class="row flex-nowrap">
            <div class="col-auto col-md-2 bg-light d-flex flex-column align-items-center"> 
                Tutaj kategorie
            </div>

            <div class="col-auto">
                ff<br>ff
            </div>

        </div>

    </div>
</template>


<script lang="ts">
import Header from '@/components/Header.vue';
import Header from '@/components/Header.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: "MainPage",
    components: { Header }
})

</script>