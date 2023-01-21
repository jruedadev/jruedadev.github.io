<template>
  <select v-model="$i18n.locale" >
    <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>
<script>
export default {
  name: "LanguageSwitcher",
  data() {
    return { locales: ["es", "en"] };
  }
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