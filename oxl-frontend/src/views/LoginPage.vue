<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>

        <div class="row col-sm-12 col-md-6 col-lg-4 d-flex align-items-center justyfy-content-center">
            
                <LoginForm />
            
        </div>

    </div>
</template>

<script lang="ts">

import Header from '@/components/Header.vue';
import { defineComponent, PropType } from 'vue';
import LoginForm from '@/components/LoginForm.vue';


export default defineComponent({
    name: "LoginPage",
    components: { Header, LoginForm }

});

</script>