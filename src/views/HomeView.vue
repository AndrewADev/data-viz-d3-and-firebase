<template>
  <div class="container home">
    <div class="row">
      <div class="col">
        <p>One interpretation of the exercises for the <a href="https://www.udemy.com/course-dashboard-redirect/?course_id=1918908">D3.js course</a> by Shaun Pelling.</p>
        <p>Use the links above to navigate to the projects.</p>
      </div>
    </div>
    <ProjectCarousel :projects="carouselProjects" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ProjectCarousel } from '@/components'
import { projects } from '@/config'

// This must be "partially static" (can't extract to a separate variable), or it won't work.
// See: https://forum.vuejs.org/t/vue-cli-3-project-dynamic-src-in-image-path-not-working/55375/4
const getAsset = (asset) => require(`../assets/${asset}`)

const carouselProjects = computed(() => {
  return projects.map(p => {
    return {
      ...p,
      imgSrc: getAsset(p.img)
    }
  })
})

</script>
