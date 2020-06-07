<template>

  <b-carousel
    :interval="4000"
    controls
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="Project One"
      text="Track your ninja's budget!"
      :img-src="ProjectOneSource"
    />

    <b-carousel-slide
      caption="Project Two"
      text="Track your ninja's fitness!"
      :img-src="ProjectTwoSource"
    />

    <b-carousel-slide
      caption="Hierarchy Example"
      text="See d3 hierarchy in action!"
      class="light-slide"
      :img-src="HierarchyExampleSource"
    />

    <b-carousel-slide
      caption="Project Three"
      text="Manage the ninja team!"
      class="light-slide"
      :img-src="ProjectThreeSource"
    />
  </b-carousel>
</template>

<script>
import ProjectOnePreview from '../assets/preview-project-one.png'
import ProjectTwoPreview from '../assets/preview-project-two.png'
import HierarchyExample from '../assets/preview-hierarchy-example.png'
import ProjectThreePreview from '../assets/preview-project-three.png'

export default {
  name: 'ProjectPreviewCarousel',
  computed: {
    ProjectOneSource () {
      return ProjectOnePreview
    },
    ProjectTwoSource () {
      return ProjectTwoPreview
    },
    HierarchyExampleSource () {
      return HierarchyExample
    },
    ProjectThreeSource () {
      return ProjectThreePreview
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .carousel-caption {
    background-color: #111 ;
    border-radius: 5px;
    opacity: 0.80;
  }
</style>
