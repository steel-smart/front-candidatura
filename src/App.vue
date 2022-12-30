<template>
    <v-app>
    <transition name="fade-in-up">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
@import "~@fortawesome/fontawesome-free/css/all.css";

.theme--light.v-application {
  background: transparent !important;
}
.v-application code {
  box-shadow: none !important;
}
</style>
