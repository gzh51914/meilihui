<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <i class="iconfont icon-icon-" @click="back"></i>
      <p>
        <span>{{list.brand}}</span>
        <em>￥{{list.price}}</em>
      </p>
      <span class="iconfont icon-gengduo"></span>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <Swiper cName="banner">
        <div
          class="swiper-slide"
          v-for="(item,index) in banners"
          :key="index"
          v-swiper="{
                    current:index,
                    length:banners.length,
                    swipe:'banner',
                    free:{
                        loop:true,
                        pagination: {
                            el: '.swiper-pagination'
                            },

                    }
                }"
        >
          <img :src="item.bigImgUrl" alt />
        </div>
      </Swiper>
      <div class="footer">
        <p>{{list.name}}</p>
        <del>￥{{list.marketPrice}}</del>
        <p>
          <span>￥{{list.price}}</span>
          <span>{{list.discount}}</span>
        </p>
      </div>
    </div>
    <!-- 倒计时 -->
    <div class="time">
      <div class="timeruning">
        <span>闪购</span>
        <span>距结束{{day}}天{{hr}}小时{{min}}分{{sec}}秒</span>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper.vue'
import instance from '@/utils/http.js'
export default {
  props: ['id', 'id2'],
  components: {
    Swiper
  },
  data () {
    return {
      list: [],
      banners: [],
      day: 0,
      hr: 0,
      min: 0,
      sec: 0
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    countdown () {
      // 定义结束时间戳
      const end = this.list.eventEndDate * 1000
      // 定义当前时间戳
      const now = Date.parse(new Date())
      // 做判断当倒计时结束时都为0
      if (now >= end) {
        this.day = 0
        this.hr = 0
        this.min = 0
        this.sec = 0
        return
      }
      // 用结束时间减去当前时间获得倒计时时间戳
      const msec = end - now
      const day = parseInt(msec / 1000 / 60 / 60 / 24) // 算出天数
      const hr = parseInt((msec / 1000 / 60 / 60) % 24) // 算出小时数
      const min = parseInt((msec / 1000 / 60) % 60) // 算出分钟数
      const sec = parseInt((msec / 1000) % 60) // 算出秒数
      // 给数据赋值
      this.day = day
      this.hr = hr > 9 ? hr : '0' + hr
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      // 定义this指向
      const that = this
      // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
      setTimeout(function () {
        that.countdown()
      }, 1000)
    }
  },
  created () {
    instance
      .get(
        `/appapi/product/detail/v3?categoryId=${this.$route.params.id}&productId=${this.$route.params.id2}&platform_code=H5&timestamp=1586573947905&summary=70411ad4e924bbc51b3e6253bf1f31ea`
      )
      .then(res => {
        this.list = res.data.infos
        this.banners = res.data.infos.images
        // console.log(this.list);
      })
  },
  mounted () {
    this.$store.commit('Show')
    this.countdown()
  },
  destroyed () {
    this.$store.commit('hide')
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 0.4rem;
  background: #fff;
  opacity: 0.8;
  display: flex;
  .icon-icon-,
  .icon-gengduo {
    font-size: 24px;
    font-weight: 700;
    line-height: 0.4rem;
    width: 0.5rem;
  }
  p {
    flex: 1;
    display: flex;
    flex-direction: column;
    span,
    em {
      margin: auto;
    }
    span {
      color: black;
      font-weight: 700;
    }
    em {
      color: red;
    }
  }
}
.banner {
  width: 100%;
  .swiper-slide {
    width: 100%;
    img {
      margin: auto;
      display: block;
      width: 3.35rem;
      height: 4rem;
    }
  }
  .footer {
    width: 3.35rem;
    height: 1rem;
    margin: auto;
    border-bottom: 1px solid #ccc;
    p:nth-of-type(1) {
      color: black;
      font-size: 18px;
    }
    del {
      font-size: 12px;
    }
    p:nth-of-type(2) {
      span:nth-of-type(1) {
        color: red;
      }
      span:nth-of-type(2) {
        border: 1px solid black;
        font-size: 12px;
        margin-left: 0.1rem;
      }
    }
  }
}
.time {
  width: 3.35rem;
  height: 0.5rem;
  margin: auto;
  border-bottom: 1px solid #ccc;
  .timeruning {
    span {
      line-height: 0.5rem;
    }
    span:nth-of-type(2) {
      font-weight: 700;
      color: block;
      margin-left: 0.2rem;
    }
  }
}
</style>
