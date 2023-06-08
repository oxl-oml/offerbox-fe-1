<template>

    <form class="border-form-r p-4 border-secondary" @submit.prevent="tryRegister()">
        <h4>Potrzebujemy kilku informacji o Tobie</h4>
        <div class="mb-3">
            <label for="inputFirstName" class="form-label">Imię</label>
            <input v-model="registerData.firstName" type="text" class="form-control" id="inputFirstName" placeholder="Jan" required/>
        </div>
        <div class="mb-3">
            <label for="inputLastName" class="form-label">Nazwisko</label>
            <input v-model="registerData.lastName" type="textin" class="form-control" id="inputLastName" placeholder="Kowalski" required/>
        </div>
        <div class="mb-3">
            <label for="inputEmail" class="form-label">Adres e-mail</label>
            <input v-model="registerData.email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="examlpe@domain.com" required/>
            <div id="emailHelp" class="form-text">Twój adres e-mail zostanie sprzedany za grosze ruskim hakerom.</div>
        </div>
        <div class="mb-3">
            <label for="inputPhone" class="form-label">Numer telefonu</label>
            <input v-model="registerData.phone" type="tel" class="form-control" id="inputPhone" aria-describedby="phoneHelp" placeholder="123456789" required/>
            <div id="phoneHelp" class="form-text">Posłuży nam do wysyłania masy SPAMu :)</div>
        </div>
        <div class="mb-3">
            <label for="inputPassword1" class="form-label">Hasło</label>
            <input v-model="registerData.password1" type="password" class="form-control" id="inputPassword1" placeholder="********" required/>
        </div>
        <div class="mb-3">
            <label for="inputPassword2" class="form-label">Powtórz hasło</label>
            <input v-model="registerData.password2" type="password" class="form-control" id="inputPassword2" placeholder="********" required/>
        </div>
        <div class="mb-3 d-flex flex-row-reverse align-items-center">
            <label for="inputTerms" class="form-check-label p-3">Zgadzam się na postanowienia zawarte w <RouterLink to="/terms" target="_blank">regulaminie</RouterLink></label>
            <input type="checkbox" class="form-check-input p-3" id="inputTerms" name="Zgadzam się" required/>
        </div>
        <div class="mb-3 d-flex">
            <input type="submit" value="Utwórz konto" class="btn btn-secondary text-white"/>
        </div>
    </form>

</template>

<script lang="ts">
import { RegistrationForm } from '@/data/entities';
import { defineComponent, PropType } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
    name: "RegistrationForm",
    data(){
        return {
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
    computed:{

    },
    methods:{
        ...mapActions(["register"]),

        tryRegister(){
            console.log("Clicked");
           
        }
    },
})


</script>

<style>
.border-form{
    border: 0px solid;
    border-radius: 35px;
}



</style>