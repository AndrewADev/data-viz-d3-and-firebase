<template>
  <div id="nav" class="p-0 pt-1">
    <div class="container-fluid p-0">
      <div class="row mx-0">
        <div class="col col-sm-4">
          <img :src="LogoSource" alt="D3 logo" class="logo"/>
        </div>

        <div class="col col-sm-7">
          <NavItems :root-links="rootLinks" :dropdown-name="dropdownName" :dropdown-links="dropdownLinks" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import Logo from '@/assets/d3.png'
import { computed } from 'vue'
import NavItems from './NavItems.vue'

const LogoSource = computed(() => Logo)

defineProps({
  rootLinks: {
    type: Array,
    default: () => []
  },
  dropdownName: String,
  dropdownLinks: {
    type: Array,
    default: () => []
  }
})
</script>
