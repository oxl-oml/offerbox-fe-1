<template>

    <form class="border-form-r p-4 border-secondary">
        <h4>Potrzebujemy kilku informacji o Tobie</h4>
        <div class="mb-3">
            <label for="inputFirstName" class="form-label">Imię</label>
            <input type="text" class="form-control" id="inputFirstName" placeholder="Jan" />
        </div>
        <div class="mb-3">
            <label for="inputLastName" class="form-label">Nazwisko</label>
            <input type="textin" class="form-control" id="inputLastName" placeholder="Kowalski" />
        </div>
        <div class="mb-3">
            <label for="inputEmail" class="form-label">Adres e-mail</label>
            <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="examlpe@domain.com" />
            <div id="emailHelp" class="form-text">Twój adres e-mail zostanie sprzedany za grosze ruskim hakerom.</div>
        </div>
        <div class="mb-3">
            <label for="inputPassword" class="form-label">Hasło</label>
            <input type="password" class="form-control" id="inputPassword" placeholder="********" />
        </div>
        <div class="mb-3">
            <label for="inputPassword2" class="form-label">Powtórz hasło</label>
            <input type="password" class="form-control" id="inputPassword2" placeholder="********" />
        </div>
        <div class="mb-3 d-flex">
            <input type="submit" value="Utwórz konto" class="btn btn-secondary text-white" />
        </div>
    </form>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: "RegistrationForm",
})


</script>

<style>
.border-form{
    border: 0px solid;
    border-radius: 35px;
}



</style>