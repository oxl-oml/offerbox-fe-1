<template>
    <RouterLink to="/login" class="btn btn-secondary text-white mx-2">
        Login
    </RouterLink>
    <RouterLink to="/register" class="btn btn-warning mx-2">
        Register
    </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "LoginRegister",
})

</script>