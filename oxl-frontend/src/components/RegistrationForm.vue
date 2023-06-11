<template>

  <form class="border-form-r p-4 border-secondary" @submit.prevent="tryRegister()">
    <h4>Potrzebujemy kilku informacji o Tobie</h4>
    <div class="mb-3">
      <label for="inputFirstName" class="form-label">Imię</label>
      <input v-model="registerData.firstName" type="text" class="form-control" id="inputFirstName" placeholder="Jan"
             required/>
    </div>
    <div class="mb-3">
      <label for="inputLastName" class="form-label">Nazwisko</label>
      <input v-model="registerData.lastName" type="textin" class="form-control" id="inputLastName"
             placeholder="Kowalski" required/>
    </div>
    <div class="mb-3">
      <label for="inputEmail" class="form-label">Adres e-mail</label>
      <input v-model="registerData.email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp"
             placeholder="examlpe@domain.com" required/>
      <div id="emailHelp" class="form-text">Twój adres e-mail zostanie sprzedany za grosze ruskim hakerom.</div>
    </div>
    <div class="mb-3">
      <label for="inputPhone" class="form-label">Numer telefonu</label>
      <input v-model="registerData.phone" type="tel" class="form-control" id="inputPhone" aria-describedby="phoneHelp"
             placeholder="123456789" required/>
      <div id="phoneHelp" class="form-text">Posłuży nam do wysyłania masy SPAMu :)</div>
    </div>

    <div class="mb-3">
      <label for="inputPassword1" class="form-label">Hasło</label>
      <div class="input-group">
        <input v-model="registerData.password1" v-bind:type="[showPassword ? 'text' : 'password']" class="form-control"
               id="inputPassword2"
               placeholder="********" required/>
        <div class="input-group-append">
          <span role="button" class="input-group-text" @click="showPassword = !showPassword">
            <i class="fa" :class="[showPassword ? 'bi bi-eye' : 'bi bi-eye-slash']" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label for="inputPassword2" class="form-label">Powtórz hasło</label>
      <div class="input-group">
        <input v-model="registerData.password2" v-bind:type="[showPassword ? 'text' : 'password']" class="form-control" id="inputPassword2"
               placeholder="********" required/>
        <div class="input-group-append">
          <span role="button" class="input-group-text" @click="showPassword = !showPassword">
            <i class="fa" :class="[showPassword ? 'bi bi-eye' : 'bi bi-eye-slash']" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="mb-3 d-flex flex-row-reverse align-items-center">
      <label for="inputTerms" class="form-check-label p-3">Zgadzam się na postanowienia zawarte w
        <RouterLink to="/terms" target="_blank">regulaminie</RouterLink>
      </label>
      <input type="checkbox" class="form-check-input p-3" id="inputTerms" name="Zgadzam się" required/>
    </div>
    <div class="mb-3 d-flex">
      <input type="submit" @click="showPassword = false" value="Utwórz konto" class="btn btn-secondary text-white"/>
    </div>
  </form>

</template>

<script lang="ts">
import {Alert, AlertTypes, DefaultErrorResponse, RegisterResponse} from '@/data/entities';
import {defineComponent} from 'vue';
import {mapActions, mapMutations} from 'vuex';
import {HttpHandler} from '@/data/httpHandler';

export default defineComponent({
  name: "RegistrationForm",
  data() {
    return {
      showPassword: false,
      registerData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password1: "",
        password2: ""
      }
    }
  },
  computed: {},
  methods: {
    ...mapActions(["register"]),
    ...mapMutations({
      setActualAlert: "setActualAlert",
    }),

    tryRegister() {
      console.log("Register button clicked");
      //this.$emit("TryRegister");
      this.register(() => {
        return new HttpHandler().register(this.registerData)
            .then((data: RegisterResponse | DefaultErrorResponse) => {
              var alert: Alert = ((data as RegisterResponse).id) ? (new Alert(AlertTypes.INFORMATION, "Konto zostało utworzone.")) : (new Alert(AlertTypes.ERROR, (data as DefaultErrorResponse).details as string | "Nieznany błąd"))
              this.setActualAlert(alert);

              if ((data as RegisterResponse).id) {
                console.log("Data as register response");
                this.$router.push({path: "/login"});
              }
              if ((data as DefaultErrorResponse).details) {
                console.log("Data as register error response");
                //this.$emit("TryRegister");
              }

              console.log(data);

            })
            .catch((error: any) => {
              this.setActualAlert(new Alert(AlertTypes.ERROR, error as string | "Nieznany błąd"))
            })
      });
    }
  },
})


</script>

<style>
.border-form {
  border: 0px solid;
  border-radius: 35px;
}


</style>