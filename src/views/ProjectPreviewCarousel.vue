<template>

  <div
    id="previewCarousel"
    class="carousel slide"
    data-interval="4000"
  >
    <ul class="carousel-indicators">
      <li data-target="#previewCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#previewCarousel" data-slide-to="1"></li>
      <li data-target="#previewCarousel" data-slide-to="2"></li>
      <li data-target="#previewCarousel" data-slide-to="3"></li>
    </ul>

    <div class="carousel-inner">
      <CarouselItem class="active" heading="Project One" description="Track your ninja's budget!" alt-text="Project 1" :img-src="ProjectOneSource" />
      <CarouselItem heading="Project Two" description="Track your ninja's fitness!" alt-text="Project 2" :img-src="ProjectTwoSource" />
      <CarouselItem heading="Hierarchy Example" description="See d3 hierarchy in action!" alt-text="Hierarchy Example" :img-src="HierarchyExampleSource"/>
      <CarouselItem heading="Project Three" description="Manage the ninja team!" alt-text="Project 3" :img-src="ProjectThreeSource"/>
    </div>

    <PreviousButton target="#previewCarousel" />
    <NextButton target="#previewCarousel" />
  </div>

</template>

<script setup>
import $ from 'jquery'
import ProjectOnePreview from '../assets/preview-project-one.png'
import ProjectTwoPreview from '../assets/preview-project-two.png'
import HierarchyExample from '../assets/preview-hierarchy-example.png'
import ProjectThreePreview from '../assets/preview-project-three.png'
import CarouselItem from '../components/carousel/CarouselItem.vue'
import PreviousButton from '../components/carousel/PreviousButton.vue'
import NextButton from '../components/carousel/NextButton.vue'
import { computed, onMounted } from 'vue'

const ProjectOneSource = computed(() => ProjectOnePreview)
const ProjectTwoSource = computed(() => ProjectTwoPreview)
const HierarchyExampleSource = computed(() => HierarchyExample)
const ProjectThreeSource = computed(() => ProjectThreePreview)

onMounted(() => {
  // The "data-ride" attribute didn't seem to be working reliably for animation
  // (whether automatically started or after user interaction). So, start it
  // manually for now.
  $('.carousel').carousel()
})

</script>

<style lang="scss" scoped>

</style>
