<template>
  <div class="swiper-container" :class="cName">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
// 引入swiper的css样式 改大写
import 'swiper/css/swiper.min.css'
export default {
  props: ['cName']
}
</script>

<style>

</style>
