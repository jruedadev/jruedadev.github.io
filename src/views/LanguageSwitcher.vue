<template>
  <select class="langselect" v-model="$i18n.locale">
    <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>
<script>
export default {
  name: "LanguageSwitcherComponent",
  data() {
    return { locales: ["es", "en"] };
  }
};
</script>