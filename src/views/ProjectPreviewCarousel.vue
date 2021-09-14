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
      <div class="carousel-item active" >
        <img class="d-block w-100" src="../assets/preview-project-one.png" alt="Project 1" />
        <div class="carousel-caption d-none d-md-block">
          <h5>Project One</h5>
          <p>Track your ninja's budget!</p>
        </div>
      </div>
      <div class="carousel-item" >
        <img class="d-block w-100" src="../assets/preview-project-two.png" alt="Project 2" />
        <div class="carousel-caption d-none d-md-block">
          <h5>Project Two</h5>
          <p>Track your ninja's fitness!</p>
        </div>
      </div>
      <div class="carousel-item" >
        <img class="d-block w-100" src="../assets/preview-hierarchy-example.png" alt="Hierarchy Example" />
        <div class="carousel-caption d-none d-md-block">
          <h5>Project Three</h5>
          <p>See d3 hierarchy in action!</p>
        </div>
      </div>
      <div class="carousel-item" >
        <img class="d-block w-100" src="../assets/preview-project-three.png" alt="Project 3"/>
        <div class="carousel-caption d-none d-md-block">
          <h5>Project Three</h5>
          <p>Manage the ninja team!</p>
        </div>
      </div>
    </div>

    <a class="carousel-control-prev" href="#previewCarousel" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#previewCarousel" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

</template>

<script>
import $ from 'jquery'
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
  },

  mounted () {
    // The "data-ride" attribute didn't seem to be working reliably for animation
    // (whether automatically started or after user interaction). So, start it
    // manually for now.
    $('.carousel').carousel()
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
