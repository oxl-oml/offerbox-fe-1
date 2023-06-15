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
                <LoginForm v-if="!isShowingProgress" @submitLogin="(form) => handleLoginData(form)"  @TryLogin="isShowingProgress = !isShowingProgress" />
                <LoginInProgress v-if="isShowingProgress" />
            </div>
        </div>        


    </div>
</template>

<script lang="ts">

import Header from '@/components/Header.vue';
import { defineComponent, onMounted, PropType } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import {Alert} from '@/data/entities'
import LoginInProgress from '@/components/LoginInProgress.vue';
import router from '@/router';
import { mapGetters, mapMutations, useStore } from 'vuex';
import AlertComponent from '@/components/AlertComponent.vue';
import { HttpHandler } from '@/data/httpHandler';

export default defineComponent({
    name: "LoginPage",
    setup(){
        const httpHandler: HttpHandler = new HttpHandler();
        const store = useStore();

        onMounted(() =>{
            store.dispatch("addUsers", httpHandler.loadUserById);
        })

    },
    data(){
        return {
            isShowingProgress: false
        }
    },
    components: { Header, LoginForm, LoginInProgress, AlertComponent },
    methods:{
        handleLoginData(form: typeof LoginForm){
            console.log("here" + form.email)
            
        },

        ...mapMutations({
           setActualAlert:"setActualAlert"
        })

    },
    computed:{
        ...mapGetters(["actualAlert"])
    },
    mounted(){
        this.setActualAlert(null);
  }

});

</script>