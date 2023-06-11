<template>
    <div class="row p-2 mt-4">
      <div class="col-sm-4 col-md-10">
        <h5>Zadania administracyjne</h5>
  
        <div v-for="item in menuItems" :key="item" class="d-flex direction-row">
          <button class="btn btn-white" v-on:click="clickItem(item)"> {{ item }} </button>
        </div>
      </div>
  
      <div style="margin: 1px;" class="col-sm-12 col-md-12 col-xl-10">
        <AdminPanelUsers v-if="selected == 'Users'" />
      </div>
      <div style="margin: 1px;" class="col-sm-12 col-md-12 col-xl-10">
        <AdminPanelCategories v-if="selected == 'Categories'" />
      </div>
      <div style="margin: 1px;" class="col-sm-12 col-md-12 col-xl-10">
        <AdminPanelProducts v-if="selected == 'Products'" />
      </div>
  
      <div class="col-sm-12 col-md-12 col-xl-10 mt-4" v-if="selected == 'WebPages'">
        <h5><i class="bi bi-globe-americas"></i> Zarządzanie stronami WWW</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Adres</th>
              <th>Typ</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="page in webPages" :key="page.id">
              <td>{{ page.address }}</td>
              <td>{{ page.technology }}</td>
              <td><a :href="'http://' + page.address" target="_blank">Przejdź</a></td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="col-sm-12 col-md-12 col-xl-10 mt-4" v-if="selected == 'FTPAccounts'">
        <h5> <i class="bi bi-hdd-rack-fill"></i> Zarządzanie FTP</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Nazwa użytkownika</th>
              <th>Katalog</th>
              <th>Rozmiar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ftpAccount in ftpAccounts" :key="ftpAccount.id">
              <td>{{ ftpAccount.username }}</td>
              <td>{{ ftpAccount.directory }}</td>
              <td>{{ ftpAccount.size }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="col-sm-12 col-md-12 col-xl-10 mt-4" v-if="selected == 'PostgresInfo'">
        <h5> <i class="bi bi-database-fill-gear"></i> Zarządzanie Postgresem</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Nazwa bazy danych</th>
              <th>Rozmiar</th>
              <th>Moduł</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="postgresInfo in postgresInfos" :key="postgresInfo.id">
              <td>{{ postgresInfo.databaseName }}</td>
              <td>{{ postgresInfo.size }}</td>
              <td>{{ postgresInfo.module }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="col-sm-12 col-md-12 col-xl-10 mt-4" v-if="selected == 'Certificates'">
        <h5> <i class="bi bi-credit-card-2-front-fill"></i> Zarządzanie Certyfikat</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Aktywny</th>
              <th></th>
              <th>Data sprawdzenia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="certificate in certificates" :key="certificate.id">
              <td>{{ certificate.name }}</td>
              <td>{{ certificate.active }}</td>
              <td>
                <button class="btn btn-primary" v-on:click="checkCertificate(certificate)">Sprawdź</button>
              </td>
              <td>
                <span v-if="certificate.checkedDate">{{ certificate.checkedDate }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="selectedCertificate">
          <h6>Informacje o certyfikacie:</h6>
          <p><strong>Nazwa:</strong> {{ selectedCertificate.name }}</p>
          <p><strong>Aktywny:</strong> {{ selectedCertificate.active }}</p>
          <p><strong>Sygnatura:</strong> {{ selectedCertificate.signature }}</p>
          <div v-if="certificateValidity !== null">
            <p><strong>Ważność certyfikatu:</strong> {{ certificateValidity ? 'Ważny' : 'Nieważny' }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import AdminPanelUsers from '../components/AdminPanels/AdminPanelUsers.vue';
  import AdminPanelCategories from '../components/AdminPanels/AdminPanelCategories.vue';
  import AdminPanelProducts from '../components/AdminPanels/AdminPanelProducts.vue';
  import { HttpHandler } from '@/data/httpHandler';
  import { Context } from '@/data/context';
  import store from '@/store';
  
  export default defineComponent({
    name: "AdminPanel",
    components: { AdminPanelUsers, AdminPanelCategories, AdminPanelProducts},
    data() {
      let menuItems: Array<string> = ['Users', 'Categories', 'Products', 'WebPages', 'FTPAccounts', 'PostgresInfo', 'Certificates'];
      let selected: string = menuItems[0];
      let webPages = [
        { id: 1, address: "api.trashv1.ct8.pl/api/docs", technology: "php" },
        { id: 2, address: "dev.trashv1.ct8.pl", technology: "nodejs" },
        { id: 3, address: "trashv1.ct8.pl", technology: "php" }
      ];
      let ftpAccounts = [
        { id: 1, username: "f35431_admin", directory: "/usr/home/trashv1/", size: "0.00 B / 0 MB" },
        { id: 2, username: "f35431_ftp_api", directory: "/usr/home/trashv1/domains/api.trashv1.ct8.pl/", size: "0.00 B / 0 MB" }
      ];
      let postgresInfos = [
        { id: 1, databaseName: "p35431_oxl_oml", size: "8.63 MB", module: "pgcrypto" }
      ];
      let certificates = [
        { id: 1, name: "136.243.156.120", active: true, signature: "Serial: 0x0410F29B5FED28BA044B0C015B0C2A274228", checkedDate: null },
        { id: 2, name: "136.243.156.121", active: true, signature: "Serial: 0x0410F29B5FED28BA044B0C015B0C2A274228", checkedDate: null }
      ];
      let selectedCertificate = null;
      let certificateValidity = null;
      return { menuItems, selected, webPages, ftpAccounts, postgresInfos, certificates, selectedCertificate, certificateValidity};
    },
  
    methods: {
      clickItem(item: string): void {
        this.selected = item;
      },
      checkCertificate(certificate: any): void {
        this.selectedCertificate = certificate;
        this.certificateValidity = null;
        certificate.checkedDate = new Date().toLocaleString();
      },
    }
  });
  </script>
  