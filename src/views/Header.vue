<template>
  <header class="px-4 lg:px-6 h-14 flex items-center">
      <a class="flex items-center justify-center" href="#">
        <span class="sr-only">JruedaDev</span>
        <span class="font-bold text-xl">JruedaDev</span>
      </a>
      <nav class="ml-auto flex gap-4 sm:gap-6">
        <a class="text-sm font-medium hover:underline underline-offset-4" href="#about">About</a>
        <a class="text-sm font-medium hover:underline underline-offset-4" href="#skills">Skills</a>
        <a class="text-sm font-medium hover:underline underline-offset-4" href="#projects">Projects</a>
        <a class="text-sm font-medium hover:underline underline-offset-4" href="#contact">Contact</a>
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
