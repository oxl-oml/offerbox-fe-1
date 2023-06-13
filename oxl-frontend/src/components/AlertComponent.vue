<template>
    <div class="col-sm-12 col-md-12 col-lg-12 mt-4 text-center">
        <div class="p-3 alert" :class="{'alert-error':(alert.alertType == alertTypes.ERROR)}">{{ alert.message }}</div>
    </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Alert } from '@/data/entities';
import { AlertTypes } from '@/data/entities';

export default defineComponent({
    name:"AlertComponent",
    data(){
        return {
            alertTypes: AlertTypes
        }
    },
    props:{
        alert:{
            type: Object as PropType<Alert>,
            required: true
        }
    }
})

</script>

<style>

.alert-error{
    /* background-color: plum !important; */
    background-color: rgba(226, 11, 11, 0.845) !important;
}

.alert{
    border-radius: 10px;
    border: 1px solid black;
}

</style>