<template>
     <div class="detailtitle">
        <div class="title" v-show="isShow">
          <p>
            <i class="iconfont icon-icon-" @click="handleBack"></i>
            <span>{{title}}</span>
            <span class="iconfont icon-gengduo"></span>
          </p>
            <div class="sort">
                <p @click="chang1">人气</p>
                <p @click="chang2">折扣</p>
                <p @click="chang3">价格</p>
                <p>筛选</p>
            </div>
        </div>
        <div class="goodsList">
          <div class="Discount">
            <p>满减</p>
            <p>上新</p>
          </div>
          <div class="cont">
            <router-link
            tag="section"
            v-for="(item) in gList"
            :key="item.productId"
            :to="{
              name:'goodsInfo',
              params:{
                id2:item.productId,
                id:$route.params.id
                }
            }"
            >
              <aside>
                <img :src="item.imageUrl" alt="">
              </aside>
              <p class="p_1">{{ item.brandName }}</p>
              <p class="p_2">{{ item.productName }}</p>
              <p class="p_3">
                <span>￥{{ item.price }}</span>
                <em>￥{{ item.marketPrice }}</em>
                <i>{{ item.discount |price}}折</i>
              </p>
            </router-link>
          </div>
        </div>
    </div>
</template>

<script>
import instance from '@/utils/http.js'
import { mapMutations } from 'vuex'
import Vue from 'vue'
Vue.filter('price', function (data) {
  if (data) {
    return data / 10 * 10
  } else {
    return '0'
  }
})
export default {

  props: ['id'],
  data () {
    return {
      isShow: true,
      gList: [],
      title: '',
      i: 0
    }
  },
  computed: {
    sort1 () {
      return sortByKey(this.gList, 'saleableQty')
    },
    sort2 () {
      return sortByKey(this.gList, 'discount')
    },
    sort3 () {
      return sortByKey(this.gList, 'price')
    }
  },
  methods: {
    ...mapMutations([('Show', 'hide')]),
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
                      document.body.scrollTop
      var scroll = scrollTop - this.i
      this.i = scrollTop
      if (scroll < 0) {
        // console.log('up')
        this.isShow = false
      } else {
        // console.log('down')
        this.isShow = true
      }
    },
    handleBack () {
      this.$router.back()
    },
    chang1 () {
      this.gList = this.sort1
    },
    chang2 () {
      this.gList = this.sort2
    },
    chang3 () {
      this.gList = this.sort3
    }
  },
  created () {
    instance.get(`/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1586448073838&summary=b805ab27beb9293b43707318f9f794f0&platform_code=H5`).then(res => {
      // console.log(res.data)
      this.gList = res.data.products
      this.title = res.data.eventName
    })
  },
  mounted () {
    this.$store.commit('Show')
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed () {
    this.$store.commit('hide')
  }
}

function sortByKey (array, key) {
  return array.sort(function (a, b) {
    var x = a[key]
    var y = b[key]
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })
}
</script>

<style lang="scss" scoped>
.detailtitle{

    background: #fff;
    .title{
      transition: all 0.8s ease;
      box-sizing: border-box;
      padding: 0 0.15rem;
      height:.8rem;
      width:100%;
      background: #fff;
      position: fixed;
      top:0;
      left:0;
      line-height: .44rem;
      text-align: center;
      z-index:12;
      p{
        display: flex;
        justify-content: space-between;
      }
      .sort{
      height: 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      }
    }
    .goodsList{
      overflow-y: auto;
      // .Discount{
      //   // display: flex;
      // }
        .cont{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          section{
            width: 48%;
              aside{
                  width: 100%;
                  height: 190px;
                img{
                  width: 100%;
                  height: 100%;
                }
            }
            p{
              color: #000;
              font-size: 0.16rem;
              height: 0.18rem;
              line-height: 0.18rem;
            }
            .p_2{
              width: 1.4rem;
              overflow: hidden;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
            }
            .p_3{
              display: flex;
              width: 95%;
              justify-content: space-between;
              align-items: center;
              font-size: 0.12rem;
              span{
                color: red;
              }
              em{
                color: #ccc;
                text-decoration: line-through;
              }
              i{
                color: #666;
                font-size: 0.14rem;
              }
            }
        }

      }
    }

  }
</style>
