<template>
    <div>
        <table>
            <tr v-for="key in Object.keys((context.currentUser) as User)">
                <th>{{ key }}</th>
                <td>{{ (context.currentUser)[key] }}</td>
            </tr>
        </table>
    </div>

</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { Context } from '@/data/context';
import { User } from '@/data/entities';
import { mapGetters } from 'vuex';


export default defineComponent({
    name: "UserPanelMyAccount",
    computed:{
        ...mapGetters(["context"])
    }


});

</script>

<style>

</style>