<template>
  <div class="lifestyle">
    <!-- banner -->
      <div class="lifebanner">
        <Swiper cName="banner">
          <div
            class="swiper-slide"
            v-for="(banner,index) in banners"
            :key="banner.name"
            v-swiper="{
              current:index,
              length:banners.length,
              swipe:'swipe'
              }
              "
          >
            <img :src="banner.main_image" alt="">
            <div class="title">
              <h3>{{banner.main_title}}</h3>
              <h4>{{banner.sub_title}}</h4>
              <h5>{{banner.description}}</h5>
            </div>
          </div>
        </Swiper>
      </div>

      <!-- 列表 -->
      <div class="list">
        <ul>
          <router-link
            tag="li"
            v-for="data in list"
            :key="data.eventId"
            :to="{
              name:'lifelist',
              params:{
                id:data.eventId
              }
            }
            "
          >
          <div class="box">
            <img :src="data.imageUrl" alt="">
            <div class="title">
              <h3>{{data.englishName}}</h3>
              <h4>{{data.chineseName}}</h4>
              <h5>{{data.discountText}}</h5>
            </div>
          </div>
          </router-link>
        </ul>
      </div>
      <!-- 底部 -->
      <Footer></Footer>
  </div>
</template>

<script>
import instance from '@/utils/http.js'
import Swiper from '@/components/Swiper'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Swiper,
    Footer
  },
  // 跳转页面  :id使用动态id  上面点击传参数  商品参数

  data () {
    return {
      banners: [],
      list: []
    }
  },
  created () {
    instance.get('/appapi/home/mktBannerApp/v3?silo_id=2013000100000000004&platform_code=PLATEFORM_H5').then(res => {
      this.banners = res.data.banners
      // console.log(this.banners);
    })
    instance.get('/appapi/silo/eventForH5?categoryId=lifestyle&pageIndex=1&timestamp=1586355515766&summary=7a388d469d7e0b0f81be1329f0e150e8&platform_code=H5').then(res => {
      // console.log(res)
      this.list = res.data.eventList
    })
  }
}
</script>
<style lang="scss" scoped>
.swiper-slide{
  width: 100%;
  position:relative;
  img{
    width: 100%;
    height: 4.5rem;
  }
  .title{
    width: 100%;
    position: absolute;
    bottom:0.6rem;
    h3,h4,h5{
      text-align: center;
      color:#fff;
    }
    h3{
      font-size: 0.28rem;
      font-weight: 700;
    }
    h4,h5{
      font-size: 0.14rem;
    }
  }
}
.list{
  li{
    width: 100%;
    padding:0.1rem;
    .box{
      position: relative;
      img{
        width: 3.55rem;
        height: 2.1rem;
      }
      .title{
        width: 100%;
        position: absolute;
        bottom: 0.1rem;
        left:0.1rem;
        h3,h4,h5{
          // text-align: center;
          color:#fff;
        }
      }
    }

  }
}
</style>
