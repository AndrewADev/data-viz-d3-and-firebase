<template>
  <a class="carousel-control-next" :href="target" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  target: String
})
</script>
