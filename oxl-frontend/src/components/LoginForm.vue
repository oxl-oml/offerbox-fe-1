<template>

    <form class="border-form p-4 border-secondary">
        <div class="mb-3">
            <label for="inputEmail" class="form-label">Adres e-mail</label>
            <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="examlpe@domain.com" />
            <div id="emailHelp" class="form-text">Twój adres e-mail zostanie sprzedany za grosze ruskim hakerom.</div>
        </div>
        <div class="mb-3">
            <label for="inputPassword" class="form-label">Hasło</label>
            <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" class="form-control" id="inputPassword" placeholder="********" />
        </div>
        <div class="mb-3 d-flex">
            <input type="submit" value="Zaloguj się" class="btn btn-secondary text-white" />
        </div>
    </form>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: "LoginForm",
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