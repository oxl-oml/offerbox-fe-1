<template>
    <div class="col-sm-12 col-md-12 col-lg-12 mt-4 text-center">
      <div
        style="color: white;"
        class="p-3 alert"
        :class="{'alert-error': (alert.alertType === alertTypes.ERROR), 
        'alert-information': (alert.alertType === alertTypes.INFORMATION),
        'alert-warning': (alert.alertType === alertTypes.WARNING),
        }"
      >
        {{ alert.message }}
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Alert } from '@/data/entities';
  import { AlertTypes } from '@/data/entities';
  
  export default defineComponent({
    name: 'AlertComponent',
    data() {
      return {
        alertTypes: AlertTypes,
      };
    },
    props: {
      alert: {
        type: Object as PropType<Alert>,
        required: true,
      },
    },
    mounted() {
      setTimeout(() => {
        const alertElement = this.$el.querySelector('.alert-error');
        if (alertElement) {
          alertElement.classList.add('fade-out');
        }
      });
    },
  });
  </script>
  
  <style>
  .alert-error {
    background-color: rgba(226, 11, 11, 0.845) !important;
    animation: fadeOut 5s forwards;
    color: white;
  }
  .alert-information {
    background-color: gold !important;
    animation: fadeOut 5s forwards;
    color: white;
  }
  .alert-warning {
    background-color: orange !important;
    animation: fadeOut 5s forwards;
    color: white;
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 1;
    }
  }
  
  .fade-out {
    animation: fadeOut 1s forwards !important;
  }
  
  .alert {
    border-radius: 10px;
    border: 2px solid black;
    font-size: larger;
  }
  </style>
  
