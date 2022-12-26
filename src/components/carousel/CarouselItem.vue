<template>
  <div class="carousel-item" >
    <img class="d-block w-100" :src="imgSrc" :alt="altText" />
    <div class="carousel-caption d-none d-md-block">
      <h5>{{ heading }}</h5>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  heading: String,
  description: String,
  imgSrc: String,
  altText: String
})

</script>

<style lang="scss" scoped>
  .carousel-caption {
    background-color: #111;
    border-radius: 5px;
    opacity: 0.80;
  }
</style>
