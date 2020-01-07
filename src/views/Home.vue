<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
    <Summary/>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Summary from '@/components/Summary.vue'

export default {
  name: 'home',
  components: {
    //HelloWorld,
    Summary,
  }
}
</script>
