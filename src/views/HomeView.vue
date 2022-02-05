<template>
  <div class="container home">
    <div class="row">
      <div class="col">
        <p>One interpretation of the exercises for the <a href="https://www.udemy.com/course-dashboard-redirect/?course_id=1918908">D3.js course</a> by Shaun Pelling.</p>
        <p>Use the links above to navigate to the projects.</p>
      </div>
    </div>
    <project-preview-carousel />
  </div>
</template>

<script>
import ProjectPreviewCarousel from './ProjectPreviewCarousel'

export default {
  name: 'HomeView',
  components: {
    ProjectPreviewCarousel
  }
}
</script>
