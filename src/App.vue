<template>
  <HeaderComponent></HeaderComponent>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import HeaderComponent from './views/Header.vue'
import FooterComponent from './views/Footer.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="scss">
@import './assets/scss/custom.scss';
</style>
