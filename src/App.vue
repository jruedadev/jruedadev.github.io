<template>
  <div class="flex flex-col min-h-[100dvh]">
  <HeaderComponent></HeaderComponent>
  <router-view></router-view>
  <SpeedInsights />
  <FooterComponent></FooterComponent>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import HeaderComponent from './views/Header.vue'
import FooterComponent from './views/Footer.vue'

import { SpeedInsights } from '@vercel/speed-insights/vue';
import { inject } from '@vercel/analytics';
inject();

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    SpeedInsights
  }
}
</script>

<style lang="scss">
</style>
