<template>

    <AlertComponent v-if="alert" :alert="alert" /> 

  <form class="border-form-1 p-4 border-secondary" @submit.prevent="tryLogin()">
    <h4>Podaj informacje o swoim koncie</h4>
    <div class="mb-3">
      <label for="inputEmail" class="form-label">Adres e-mail</label>
      <input v-model="loginForm.email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp"
             placeholder="examlpe@domain.com"/>
    </div>
    <div class="mb-3">
      <label for="inputPassword" class="form-label">Hasło</label>
      <div class="input-group">
        <input v-model="loginForm.password" v-bind:type="showPassword ? 'text' : 'password'" class="form-control"
               id="inputPassword"
               placeholder="********"/>
        <div class="input-group-append">
          <span role="button" class="input-group-text" @click="showPassword = !showPassword">
            <i class="fa" :class="[showPassword ? 'bi bi-eye' : 'bi bi-eye-slash']" aria-hidden="true"></i>
          </span>
        </div>
      </div>

    </div>
    <div class="mb-3 d-flex">
      <input type="submit" value="Zaloguj się" class="btn btn-secondary text-white" />
    </div>
  </form>

</template>

<script lang="ts">
import {HttpHandler} from '@/data/httpHandler';
import {defineComponent, PropType, VueElement} from 'vue';
import {Alert, AlertTypes, DefaultErrorResponse, LoginForm, LoginResponse} from '@/data/entities'
import {mapState, mapActions, mapMutations} from 'vuex';
import router from '@/router';
import AlertComponent from './AlertComponent.vue';

export default defineComponent({
    name: "LoginForm",
    data() {
        var cAlert: any = null;
        return {
            showPassword: false,
            loginForm: {
                email: null,
                password: null
            },
            alert: cAlert
        };
    },
    methods: {
        ...mapActions(["login"]),
        ...mapMutations({
            loginMutation: "loginUser",
            addTemporaryEmail: "addTemporaryEmail"
        }),
        //To działa dobrze - nie dotykać bo przestanie
        tryLogin() {
            this.showPassword = false;
            this.login(() => {
                this.alert = new Alert(AlertTypes.INFORMATION, "Trying to log in...");
                this.addTemporaryEmail(this.loginForm.email);
                return new HttpHandler().login(this.loginForm)
                    .then((data) => {
                        console.log(data);
                    //Sprawdz czy poprawnie zalogowano usera (Jezeli typ danych = LoginResponse to zalogowano poprawnie)
                    if ((data as LoginResponse).tokenData) {
                        this.loginMutation(data);
                        router.push({ path: "/myprofile" });
                    }
                    else {
                        this.alert = new Alert(AlertTypes.ERROR, (data as DefaultErrorResponse).details || "Nieznany błąd" )
                    }
                }).catch((error: any) => { 
                    this.alert = (new Alert(AlertTypes.ERROR, error as string | "Nieznany błąd")); 
                    
                });
            });
        }
    },
    components: { AlertComponent }
})


</script>

<style>
.border-form {
  border: 0px solid;
  border-radius: 35px;
  position: relative;
}

.border-form:after {
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

.border-form:before {
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