<template>
    <div class="swiper-container" :class="cname">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
         <div class="swiper-pagination"></div>
    </div>
</template>

<script>
// 引入 swiper 的css
import 'swiper/css/swiper.min.css'

export default {
  props: ['cname']

}
</script>

<style lang="scss" scoped>
</style>
