<template>
  <div class="container-fluid">
    <div class="row section_home">
      <div class="col-6 p-0 d-flex flex-column justify-content-center align-items-center">
        <img
          class="profile_picture img-circle"
          src="../../assets/img/logo_transparent.png"
          alt="JRueda"
        />
      </div>
      <div
        class="col-6 p-0 d-flex flex-column justify-content-center align-items-center main_banner"
      >
        <h1>{{ $t('home.welcome') }}</h1>
        <h2 class="content__container__text">{{ $t('home.description.title') }}</h2>
        <div class="content">
          <div class="content__container">
            <ul class="content__container__list">
              <li class="content__container__list__item" :key="key" v-for="(slide, key) in slides">
                {{ $t(slide) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  components: {},
  metaInfo() {
    return {
      title: 'Johan Roberto Rueda - Software Engineer',
      meta: [
        { name: 'description', content: 'This is my Personal Software Engineer Portfolio' },
        { property: 'og:title', content: 'Johan Roberto Rueda - Software Engineer' },
        { property: 'og:site_name', content: 'JRuedaDev' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' }
      ]
    }
  },
  data() {
    return {
      slides: [
        'home.description.slides.first',
        'home.description.slides.second',
        'home.description.slides.third',
        'home.description.slides.fourth'
      ],
      documents: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
