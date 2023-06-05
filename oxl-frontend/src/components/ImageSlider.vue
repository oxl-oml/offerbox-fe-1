<template>
     <div>
    <image-slider v-model="slides">
      Sample Text
    </image-slider>
  </div>
</template>



<script lang="ts">

import '@gaiaz/vue-image-slider/dist/image-slider.css'
import { defineComponent } from 'vue';

export default defineComponent({
  data () {
    return {
      slides: [
        'https://dummyimage.com/300&text=1',
        'https://dummyimage.com/300&text=2'
      ]
    }
  },
  components: {
    
  }
}


</script>