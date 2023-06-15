<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>
        
        <div v-if="actualAlert" class="row align-items-center justify-content-center">
            <AlertComponent :alert="actualAlert" />
        </div>

        <div class="row align-items-center justify-content-center">
            <div class="col-sm-12 col-md-6 col-lg-4  mt-4">
                <RegistrationForm v-if="!isShowingProgress" @TryRegister="isShowingProgress = !isShowingProgress"/>
                <LoginInProgress v-if="isShowingProgress" />
            </div>
        </div>


    </div>
</template>

<script lang="ts">

import Header from '@/components/Header.vue';
import { defineComponent, PropType } from 'vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
import LoginInProgress from '@/components/LoginInProgress.vue';
import { Alert, AlertTypes } from '@/data/entities';
import { mapGetters } from 'vuex';
import AlertComponent from '@/components/AlertComponent.vue';


export default defineComponent({
    name: "RegistrationPage",
    components: { Header, RegistrationForm, LoginInProgress, AlertComponent },
    data(){
        
        return {
            isShowingProgress: false as boolean
        }
    },
    methods:{
      
    },
    computed:{
        ...mapGetters(["actualAlert"])
    }

});

</script>