<template>

  <div
    id="previewCarousel"
    class="carousel slide"
    data-interval="4000"
  >
    <ul class="carousel-indicators">
      <li
        v-for="(_, idx) of projects"
          :class="{active: idx === 0}"
          :key="idx"
          data-target="#previewCarousel"
          :data-slide-to="idx"
      >
      </li>
    </ul>

    <div class="carousel-inner">
      <CarouselItem
        v-for="({heading, description, altText, imgSrc}, idx) of projects"
          :key="idx"
          :class="{active: idx === 0}"
          :heading="heading"
          :description="description"
          :alt-text="altText"
          :img-src="imgSrc"
      />
    </div>

    <PreviousButton target="#previewCarousel" />
    <NextButton target="#previewCarousel" />
  </div>

</template>

<script setup>
import $ from 'jquery'
import CarouselItem from './CarouselItem.vue'
import PreviousButton from './PreviousButton.vue'
import NextButton from './NextButton.vue'
import { onMounted } from 'vue'

defineProps({
  projects: {
    type: Array,
    default: () => []
  }
})

onMounted(() => {
  // The "data-ride" attribute didn't seem to be working reliably for animation
  // (whether automatically started or after user interaction). So, start it
  // manually for now.
  $('.carousel').carousel()
})

</script>

<style lang="scss" scoped>

</style>
