<template>
    <div class="d-flex flex-column justify-content-start align-items-start p-3">
        <div class="">
            Imię Nazwisko
        </div>
        <div>
            Wystawionych przedmiotów:
        </div>
        <div>
            Średnia ocen:
        </div>
    </div>

</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from 'vue';
import { User } from '@/data/entities';


export default defineComponent({
    name:"SellerDetails",
    props:{
        sellerDetails:{
            type: Object as PropType<User>,
            //required: true
        }
    }
})

</script>