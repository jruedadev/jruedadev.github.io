<template lang="es">
  <nav class="navbar navbar-expand-lg navbar-light transparent_navbar">
    <div class="container-fluid">
      <a class="navbar-brand ml-3" href="#">
          <img src="../assets/img/logo_transparent.png" alt="JRueda" width="80" height="80"
              class="d-inline-block align-text-top">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggle">
          <ul class="navbar-nav ms-auto  mb-2 mb-lg-0">
              <li class="nav-item mx-4">
                <router-link to="/" class="nav-link">{{ $t('menu.home') }}</router-link>
              </li>
              <li class="nav-item mx-4">
                <router-link to="/about" class="nav-link">{{ $t('menu.about') }}</router-link>
              </li>
              <li class="nav-item mx-4">
                <router-link to="/skills" class="nav-link">{{ $t('menu.skills') }}</router-link>
              </li>
              <li class="nav-item mx-4">
                <router-link to="/work" class="nav-link">{{ $t('menu.work') }}</router-link>
              </li>
              <li class="nav-item mx-4">
                <a href="/pdf/hoja_de_vida.pdf" class="nav-link" target="_blank">{{ $t('menu.cv') }}</a>
              </li>
              <li class="nav-item mx-4">
                <router-link to="/contact" class="nav-link">{{ $t('menu.contact') }}</router-link>
              </li>
              <li class="nav-item mx-4">
                <LanguageSwitcher />
              </li>
          </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";
export default {
  name: "HeaderComponent",
  components: { LanguageSwitcher }
};
// (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js
</script>
<style lang="scss">
nav.navbar {
  min-height: 80px;
}

.main_banner {
  height: 500px;
}
</style>