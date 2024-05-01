<template>
  <select class="block py-2 px-3 langselect" v-model="$i18n.locale">
    <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<style lang="scss">
.langselect {
  display: inline-block;
  position: relative;
  background-color: #c0c0c0;
  width: 50px;
  height: 40px;
  border: 1px solid #000;
  color: #000;
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
}

.langselect>option {
  color: #000;
  background-color: #c0c0c0;
}
</style>

<script>
export default {
  name: 'LanguageSwitcherComponent',
  data() {
    return { locales: ['es', 'en'] }
  }
}
</script>
