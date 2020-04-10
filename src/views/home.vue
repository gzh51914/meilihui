<template>
  <div class="home">
    <Swiper canme="swipe">
      <div class="swiper-slide"
      v-for="(item,index) in imgList"
      :key="item.id"
      v-swiper="{
        current:index,
        length:imgList.length,
        swipe:'swipe',
        free:{
          loop:true,
           pagination: {
              el: '.swiper-pagination'
                },
              autoplay: {
                  delay: 2000
                }
        }
      }"
      >
       <img width="100%" :src="item.main_image" alt="">
      </div>
    </Swiper>
    <!-- 抢 -->
    <div class="newsGoods">
      <section class="as_1"
      >
      <aside>
        <p v-for="(show) in show2"
           :key="show.id">
          <span>{{ show.main_title }}</span>
          <em>{{ show.sub_title }}</em>

        </p>

        </aside>

        <div class="goodsImG">
          <img src="https://cdn15.mei.com/product/JA0-2723-100012-C/1cf891c0484a4cf25865b6cb9eb84d7c548ef33acf6994a5854f61c93e94e5b3.jpg@300w_400h_2e_75q" alt="">
          <img src="https://cdn15.mei.com/product/JA0-2754-100003-C/82762819de238b121ee52871b3c1e253bc49349b000a92a10ce7908ead3e2ab7.jpg@300w_400h_2e_75q" alt="">
        <img src="https://cdn13.mei.com/product/KW6-112-00059/KW6-112-00059a.jpg@300w_400h_2e_75q" alt="">
        <img src="https://cdn12.mei.com/product/FYV-213-00001/b8f73dd54f9ff13fe187e81117a5304e.jpg@300w_400h_2e_75q" alt="">
        </div>
      </section>
      <aside class="as_2">

      </aside>
    </div>
    <!-- 商品列表 -->
    <List></List>
    <!-- 搜索页面 -->
    <More v-show="isShow"></More>
  </div>
</template>

<script>
import instance from '@/utils/http.js'
import Swiper from '@/components/swiper.vue'
// import swipe from 'swiper'
import List from '@/views/goodsList/goodslist'
import More from '@/views/home/more'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      imgList: [],
      show2: [],
      show: false
    }
  },

  created () {
    instance.get('/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5').then(res => {
      // console.log(res.data.banners);
      this.imgList = res.data.banners
    })
    instance.get('/appapi/ninenew/operational/v1?credential=').then(res => {
      // console.log(res.data.show2);
      this.show2 = res.data.show2
    })
  },
  computed: {
    ...mapState([('isShow')])
  },
  components: {
    Swiper,
    List,
    More
  }
}
</script>
<style lang="scss" scoped>
.home{
  background: #fff;
 .newsGoods{
   height: 1.3rem;
   box-sizing: border-box;
   padding:  0.15rem;
   background: rgba(255,0,0,0);
   section{
     .goodsImG{
       display: flex;
       justify-content: space-between;
       img{
       width: 0.85rem;
       height: 0.85rem;
      //  margin-right: 0.05rem;
      }
     }
      aside{
     display: flex;
     justify-content: space-between;
      p{
        display: flex;
        justify-content: space-between;
        height: 0.3rem;
        align-items: center;
     span{
       font-size: 0.14rem;
      color: #000;
      vertical-align: middle;
     }
     em{
      transform: scale(0.8);
      vertical-align: middle;
           }
        }
      }
   }
 }
}
</style>
