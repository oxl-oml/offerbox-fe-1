<template>

    <div>
        Trwa logowanie do serwisu.
    </div>

</template>

<script lang="ts">
import { HttpHandler } from '@/data/httpHandler';
import { defineComponent, PropType, VueElement } from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default defineComponent({
    name: "LoginInProgress",
    data(){

    },
    methods:{

        
    }
})



</script>

<style>
.border-form{
    border: 0px solid;
    border-radius: 35px;
    position: relative;
}

.border-form:after{
    border-radius: 50px;
    border-width: 0px 0px 0px 2px;
    border-style: solid;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    z-index: -10;
}
.border-form:before{
    border-radius: 50px;
    border-width: 0px 2px 0px 0px;
    border-style: solid;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: -10;
}

</style>