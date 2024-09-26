<template>
  <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t" id="contact">
      <p class="text-xs text-gray-500 dark:text-gray-400">© {{ year }} JruedaDev. All rights reserved.</p>
      <nav class="sm:ml-auto flex gap-4 sm:gap-6">
        <a class="text-xs hover:underline underline-offset-4" href="#" aria-label="GitHub">
          <GithubIcon class="h-6 w-6" />
        </a>
        <a class="text-xs hover:underline underline-offset-4" href="#" aria-label="LinkedIn">
          <LinkedinIcon class="h-6 w-6" />
        </a>
        <a class="text-xs hover:underline underline-offset-4" href="#" aria-label="Email">
          <MailIcon class="h-6 w-6" />
        </a>
      </nav>
    </footer>
</template>
<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style lang=""></style>
