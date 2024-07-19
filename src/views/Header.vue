<template>
  <header class="px-4 lg:px-6 h-14 flex items-center">
    <router-link :to="home">
      <img src="../assets/img/logo_transparent.png" class="h-20" alt="JruedaDev Logo" />
    </router-link>
    <nav class="ml-auto flex gap-4 sm:gap-6">
      <router-link v-for="(item, index) in items" :key="index" :to="item.link" class="text-sm font-medium hover:text-primary underline-offset-4">
        {{ $t(item.title) }}
      </router-link>
      <LanguageSwitcher />
    </nav>
  </header>

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
      ],
      home: ""
    }
  }
}
</script>
