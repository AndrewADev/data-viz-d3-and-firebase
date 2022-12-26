<template>
  <a class="carousel-control-prev" :href="target" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  target: String
})
</script>
