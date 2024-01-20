<template>
  ;
  <footer>&copy; {{ year }} Johan Roberto Rueda</footer>
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
