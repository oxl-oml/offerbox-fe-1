<template>

    <form class="border-form-1 p-4 border-secondary">
        <h4>Podaj informacje o swoim koncie</h4>
        <div class="mb-3">
            <label for="inputEmail" class="form-label">Adres e-mail</label>
            <input v-model="loginForm.email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="examlpe@domain.com" />
        </div>
        <div class="mb-3">
            <label for="inputPassword" class="form-label">Hasło</label>
            <input v-model="loginForm.password" type="password" class="form-control" id="inputPassword" placeholder="********" />
        </div>
        <div class="mb-3 d-flex">
            <input type="button" value="Zaloguj się" class="btn btn-secondary text-white" v-on:click="tryLogin()"/>
        </div>
    </form>

</template>

<script lang="ts">
import { HttpHandler } from '@/data/httpHandler';
import { defineComponent, PropType, VueElement } from 'vue';
import {LoginForm} from '@/data/entities'
import { mapState, mapActions, mapMutations } from 'vuex';

export default defineComponent({
    name: "LoginForm",
    data(){

        return {
            loginForm:{
                email: null,
                password: null
            }
        }
    },
    methods:{

        ...mapActions(["login"]),
        ...mapMutations({
            loginMutation: "loginUser"
        }),
        
        tryLogin(){
            this.login((data: LoginForm) => {
                return new HttpHandler().login(this.loginForm).then((data)=> {console.log(data); this.loginMutation(data)})
            })
        }
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