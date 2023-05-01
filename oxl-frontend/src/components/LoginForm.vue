<template>

    <form>
        <div class="mb3">
            <label for="inputEmail" class="form-label">Adres e-mail</label>
            <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">Twój adres e-mail zostanie sprzedany za grosze ruskim hakerom.</div>
        </div>
        <div class="mb-3">
            <label for="inputPassword" class="form-label">Hasło</label>
            <input type="password" class="form-control" id="inputPassword">
        </div>
    </form>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: "LoginForm",
})


</script>