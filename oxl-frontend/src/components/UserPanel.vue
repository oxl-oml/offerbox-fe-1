<template>
    <div>
        
        <div class="row p-2 mt-4">
            <div class="col-sm-4 col-md-2 bg-light">
                <h5>Witaj {{ userData.firstName }}!</h5>
                
                <ul class="list-group h-100">
                    <li v-for="item in menuItems" class="list-group-item custom-list-item bg-light" v-on:click="clickItem(item)">
                        {{ item }}
                    </li>
                </ul>
            </div>
  
            <div class="col-sm-12 col-md-12 col-xl-10">
                <UserPanelMyAccount v-if="selected == menuItems[0]" />
                <UserPanelMyProducts v-else-if="selected == menuItems[1]" />
                <UserPanelMyFavourite v-else-if="selected == menuItems[2]" />
                <AdminPanel v-else-if="selected === menuItems[3] && isAdmin" />
            </div>
        </div>
    </div>
    <AlertComponent v-if="showAlert && alert" class="col-sm-12 col-md-12 col-lg-12 mt-4 text-center" :alert="alert" />

  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import UserPanelMyAccount from '@/components/UserPanels/UserPanelMyAccount.vue';
  import { Alert, AlertTypes, User } from "@/data/entities";
  import { mapGetters, mapMutations } from 'vuex';
  import router from '@/router';
  import UserPanelMyProducts from './UserPanels/UserPanelMyProducts.vue';
  import AdminPanel from './AdminPanel.vue';
  import Footer from './Footer.vue';
import AlertComponent from './AlertComponent.vue';
  
  export default defineComponent({
    name: "UserPanel",
    components: { UserPanelMyAccount, UserPanelMyProducts, AdminPanel, AlertComponent, Footer },
    data() {
      return {
        menuItems: ['Moje konto', 'Moje produkty', 'Moje ulubione', 'Wyloguj'],
        selected: 'Moje konto',
        alert: null as Alert | null,
        showAlert: false
      };
    },
    methods: {
      ...mapMutations(["logout"]),
      clickItem(item: string): void {
        this.selected = item;
  
        // Jeżeli ostatni to wyloguj
        if (item === this.menuItems[this.menuItems.length - 1]) {
          console.log("Wyloguj!");
          this.logout();
          router.push("/");
        }
      }
    },
    computed: {
      userData(): User {
        const loggedUser: User = JSON.parse(localStorage.getItem("User") as string);
        return loggedUser;
      },
      isAdmin(): boolean {
        const isAdmin = this.userData && (this.userData.role === "ADM" || this.userData.role === "SADM");
        return isAdmin;
      }
    },
    watch: {
      selected: {
        handler(newVal) {
          if (newVal === this.menuItems[3] && !this.isAdmin) {
            this.alert = new Alert(AlertTypes.ERROR, "Nie masz wystarczających uprawnień do panelu administratora!");
            this.showAlert = true;
          } else {
            this.showAlert = false;
            this.alert = null;
          }
        },
        immediate: true
      }
    }
  });
  </script>
  
  <style>
  .custom-list-item {
    cursor: pointer;
    border-top: 3px !important;
    border-bottom: 3px !important;
    border-left: 0px !important;
    border-right: 0px !important;
  }
  
  .custom-list-item:hover {
    background-color: gold !important;
  }
  
  .selected-category {
    background-color: #27292b !important;
    color: white;
  }
  </style>  