<template>
     <div class="detailtitle">
        <i  @click="handleBack">《==</i>
        <span></span>
        <span>{{this.$route.params.id}}</span>

    </div>
</template>

<script>
import instance from '@/utils/http.js'
import { mapMutations } from 'vuex'
export default {

  props: ['id'],

  methods: {
    ...mapMutations([('Show', 'hide')]),

    handleBack () {
      // this.$router.back()
      // 当用户点击back的时候，希望调用者来去决定做什么样的功能
      this.$router.back()
    }
  },
  created () {
    instance.get(`/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1586448073838&summary=b805ab27beb9293b43707318f9f794f0&platform_code=H5`).then(res => {
      console.log(res)
    })
  },
  mounted () {
    this.$store.commit('Show')
  },
  destroyed () {
    this.$store.commit('hide')
  }
}
</script>

<style lang="scss" scoped>
.detailtitle{
    box-sizing: border-box;
    padding: 0 0.15rem;
    height:.44rem;
    width:100%;
    background: #fff;
    position: fixed;
    top:0;
    left:0;
    line-height: .44rem;
    text-align: center;
    z-index:12;
    display: flex;
    justify-content: space-between;}
</style>
