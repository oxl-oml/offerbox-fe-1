<template>
    <footer class="footer text-white py-4" v-show="showFooter">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="left-side-footer d-flex flex-column align-items-start">
              <a href="#">Strona główna</a>
              <a href="">FAQ</a>
              <a href="mailto:social.service.pofferbox@gmail.com?subject=OfferBox kontakt">Kontakt</a>
            </div>
          </div>
          <div class="col-md-6">
            <div class="right-side-footer d-flex justify-content-end align-items-center">
              <span class="ml-auto">© 2023 OfferBox, Wszelkie prawa zastrzeżone.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Context } from '@/data/context';
  import { User } from '@/data/entities';
  import LoginRegister from './LoginRegister.vue';
  
  export default defineComponent({
    name: "Footer",
    components: { LoginRegister },
    props: {
      user: {
        type: Object as PropType<User>,
      },
    },
    data() {
      return {
        showFooter: false,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        const scrollPercentage = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        this.showFooter = scrollPercentage >= 85;
      },
    },
  });
  </script>
  
  <style scoped>
  .footer {
    background-color: #000000;
    padding-top: 70px;
    padding-bottom: 40px;
    color: white;
  }
  
  .left-side-footer {
    color: white;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .left-side-footer a,
  .right-side-footer a {
    color: white;
  }
  
  .right-side-footer {
    color: white;
    font-size: 12px;
  }
  
  .right-side-footer ul {
    padding-left: 0;
    display: flex;
    list-style-type: none;
  }
  
  .right-side-footer ul li {
    margin-right: 10px;
  }
  
  .right-side-footer ul li a {
    color: white;
    text-decoration: none;
  }
  
  .right-side-footer ul li a:hover {
    text-decoration: underline;
  }
  </style>
  