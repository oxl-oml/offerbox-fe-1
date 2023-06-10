<template>
  <div v-for="image in images" class="custom-img-slider" :style="`background-image: url(${image})`">
  </div>
</template>



<script lang="ts">

import '@gaiaz/vue-image-slider/dist/image-slider.css'
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name:"ImageSlider",
  props:{
    images:{
      type: Object as PropType<string[]>,
      required: true
    }
  },
  data () {
  }
  
})


</script>

<style>
.custom-img-slider{
  overflow: hidden;
  max-width: 100%;
  min-height: 45vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-clip: padding-box;
}

</style>

TODO: Zrobić lepszy slider