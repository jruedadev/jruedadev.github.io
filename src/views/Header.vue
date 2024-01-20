<template>
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
              <li class="nav-item mx-4" v-for="item in items" :key="item.title">
                <router-link :to="item.link" class="nav-link" activeClass="active">{{ $t(item.title) }}</router-link>
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
import LanguageSwitcher from './LanguageSwitcher.vue'
export default {
  name: 'HeaderComponent',
  components: { LanguageSwitcher },
  data() {
    return {
      items: [
        { title: 'menu.home', link: '/' },
        { title: 'menu.about', link: '/about' },
        { title: 'menu.skills', link: '/skills' },
        { title: 'menu.work', link: '/work' },
        { title: 'menu.contact', link: '/contact' }
      ]
    }
  }
}
</script>
