<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>

        <div v-if="alert" class="row align-items-center justify-content-center">
            {{ alert?.message }}
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
import { defineComponent, PropType } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import {Alert} from '@/data/entities'
import LoginInProgress from '@/components/LoginInProgress.vue';


export default defineComponent({
    name: "LoginPage",
    data(){
        return {
            isShowingProgress: false
        }
    },
    components: { Header, LoginForm, LoginInProgress },
    props:{
        alert:{
            type: Object as PropType<Alert>,
            required: false
        }
    },
    methods:{
        handleLoginData(form: typeof LoginForm){
            console.log("here" + form.email)
        }
    }

});

</script>