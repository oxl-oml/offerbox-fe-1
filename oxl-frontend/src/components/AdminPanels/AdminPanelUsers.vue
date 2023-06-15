<template>
<h5> <i class="bi bi-person-fill-exclamation"></i> Zarządzanie Użytkownikami</h5>
<div class="col-md-12 d-flex align-items-center justify-content-end">
    <button style="margin: 5px; font-size: small;" class="btn btn-primary" @click="downloadReport()">Wygeneruj raport</button>
</div>
    <table class="interactive-table" v-if="users[0]">

        <tr>
            <th>
                Manage
            </th>
            <th v-for="key in Object.keys((users[0]) as User)">
                {{ key }}
            </th>
        </tr>
        
        <tr v-for="user in users" :key="user?.dbaseId" >
            <td>
                <RouterLink :to="{path: 'admin/users/edit/'+user?.dbaseId}">Edit</RouterLink>
                <RouterLink :to="{path: 'admin/users/delete/'+user?.dbaseId}">Delete</RouterLink>
            </td>
            <td v-for="val in Object.values((user as User))" :title="val" :contenteditable="val.key != 'ddBaseId'">
                {{ formatValue(val) }}
            </td>
        </tr>
    </table>

</template>


<script lang="ts">
import { HttpHandler } from '@/data/httpHandler';
import store from '@/store';
import { defineComponent, onMounted } from 'vue';
import { mapGetters, useStore, mapState } from 'vuex';
import { User } from '@/data/entities';
import { StoreState } from '@/store';

export default defineComponent({
    setup(){
        return {store: useStore()}
    },
    name: "AdminPanelUsers",
    data(){

        const httpHandler = new HttpHandler();

        onMounted(()=> {
            store.dispatch("loadUsers", httpHandler.loadUsers);
        })
    },
    computed:{
        ...mapState<StoreState>({
            users: (state: StoreState) => state.users
            
        }),
        ...mapGetters(["users"])
    },
    methods:{
        formatValue(val: string): string{
            if(val.length > 20){
                return `${val.substring(0,19)}...`
            }
            return val;
        },
        downloadReport(): void {
        const httpHandler = new HttpHandler();

        httpHandler.loadReports()
        .then((response: ArrayBuffer) => {
          const blob = new Blob([response], { type: 'application/pdf' })
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.log("Error podczas pobierania raporrtu", err);
        });
      },
    }
});


</script>

<style>
.interactive-table {
  font-size: small;
}

.interactive-table th,
.interactive-table td {
  border-collapse: collapse;
  border: 2px solid grey;
  padding: 4px;
}

.interactive-table td {
  max-width: 600px;
}

.interactive-table tr:nth-child(2n) {
  background-color: gainsboro;
}
</style>