<template>
  <div class="section_home">
    <div class="
        d-flex
        flex-column
        justify-content-center
        align-items-center
        main_banner
      ">
      <h1>{{ $t('home.welcome') }}</h1>
      <h2 class="content__container__text">{{ $t('home.description.title') }}</h2>
      <div class="content">
        <div class="content__container">
          <ul class="content__container__list">
            <li class="content__container__list__item" :key="key" v-for="(slide, key) in slides">{{ $t(slide) }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import SectionSeparator from "./Styles/SectionSeparator.vue";

export default {
  name: "HomeComponent",
  components: {
    // SectionSeparator,
  },
  metaInfo() {
    return {
      title: "Johan Roberto Rueda - Web Developer",
      meta: [
        { name: 'description', content: 'This is my Personal Web Developer Portfolio' },
        { property: 'og:title', content: "Johan Roberto Rueda - Web Developer" },
        { property: 'og:site_name', content: 'JRuedaDev' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' }
      ]
    }
  },
  data() {
    return {
      slides: [
        "home.description.slides.first",
        "home.description.slides.second",
        "home.description.slides.third",
        "home.description.slides.fourth",
      ]
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 160px;
  overflow: hidden;

  font-family: "Lato", sans-serif;
  font-size: 30px;
  line-height: 40px;
  color: #ecf0f1;

  &__container {
    font-weight: 600;
    overflow: hidden;
    height: 40px;
    padding: 0 40px;

    &:before {
      content: "{";
      left: 0;
    }

    &:after {
      content: "}";
      position: absolute;
      right: 0;
    }

    &:after,
    &:before {
      position: absolute;
      top: 0;

      color: #6be0fe;
      font-size: 42px;
      line-height: 40px;

      -webkit-animation-name: opacity;
      -webkit-animation-duration: 2s;
      -webkit-animation-iteration-count: infinite;
      animation-name: opacity;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }

    &__text {
      display: inline;
      float: left;
      margin: 0;
    }

    &__list {
      margin-top: 0;
      padding-left: 50px;
      text-align: left;
      list-style: none;

      -webkit-animation-name: change;
      -webkit-animation-duration: 10s;
      -webkit-animation-iteration-count: infinite;
      animation-name: change;
      animation-duration: 10s;
      animation-iteration-count: infinite;

      &__item {
        line-height: 40px;
        margin: 0;
      }
    }
  }
}

@-webkit-keyframes opacity {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

@-webkit-keyframes change {

  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }

  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }

  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }

  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }

  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}

@-o-keyframes opacity {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

@-o-keyframes change {

  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }

  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }

  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }

  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }

  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}

@-moz-keyframes opacity {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

@-moz-keyframes change {

  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }

  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }

  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }

  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }

  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}

@keyframes opacity {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

@keyframes change {

  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }

  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }

  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }

  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }

  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}
</style>
