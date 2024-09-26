<template>
<main class="flex-1">
      <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48" id="about">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center space-y-4 text-center">
            <div class="space-y-2">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                JruedaDev
              </h1>
              <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Fullstack Web Developer passionate about creating elegant, efficient, and user-friendly web applications.
              </p>
            </div>
            <div class="space-x-4">
              <a href="#contact" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                Contact Me
              </a>
              <a href="#projects" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4">
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>
      <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="skills">
        <div class="container px-4 md:px-6">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Skills</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="skill in skills" :key="skill" class="flex items-center justify-center p-4 bg-white rounded-lg shadow dark:bg-gray-700">
              <span class="font-medium">{{ skill }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
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
