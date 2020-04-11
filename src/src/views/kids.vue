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
    <!-- 五个 -->
        <div class="navs">
            <ul>
                <li
                   v-for="data in nav"
                   :key="data.categoryTwoId"
                >
                    <img :src="data.categoryImgStr" alt="">
                </li>
            </ul>
        </div>
    <!-- 列表 -->
      <div class="list">
        <ul>
          <li
            v-for="data in list"
            :key="data.eventId"
            @click="tolist(data.eventId)"
          >
          <div class="box">
            <img :src="data.imageUrl" alt="">
            <div class="title">
              <h3>{{data.englishName}}</h3>
              <h4>{{data.chineseName}}</h4>
              <h5>{{data.discountText}}</h5>
            </div>
          </div>

          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import instance from '@/utils/http.js'
import Swiper from '@/components/Swiper'
export default {
  components: {
    Swiper
  },
  data () {
    return {
      banners: [],
      list: [],
      nav: []
    }
  },
  methods: {
    tolist (id) {
      this.$router.push(`/kidslist/${id}`)
    }
  },
  created () {
    // banner数据
    instance.get('/appapi/home/mktBannerApp/v3?silo_id=2013000100000000005&platform_code=PLATEFORM_H5').then(res => {
      this.banners = res.data.banners
      // console.log(this.banners);
    })
    // 分类数据
    instance.get('/appapi/cms/cmsDetail/v3?silo=2013000100000000005&ids=2120000100000000146&timestamp=1586355885762&summary=6c2c82ca611ef8a6c9bfc485a387a2f0&platform_code=H5').then(res => {
      this.nav = res.data.resultList[0].data
      // console.log(this.nav)
    })
    // 列表数据
    instance.get('/appapi/silo/eventForH5?categoryId=kids&pageIndex=1&timestamp=1586355885561&summary=141c12d511d23f29783bf1c79a2ab9e9&platform_code=H5').then(res => {
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
.navs{
    width: 100%;
    ul{
        display: flex;
        flex-direction: row;
        height: 0.85rem;
        justify-content:space-around;
        width: 3.6rem;
        margin: auto;
    }
    li{
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
        img{
            display: block;
            width: 0.6rem;
            height: 0.8rem;
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
          color:#fff;
        }
      }
    }

  }
}
</style>
