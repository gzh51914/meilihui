<template>
  <div>
      <div class="top">
          <div class="header">
              <i class="iconfont icon-icon-" @click="back"></i>
              <p>{{title}}</p>
              <span class="iconfont icon-gengduo"></span>
          </div>
          <div class="navs">
              <ul>
                  <li @click="change1">人气</li>
                  <li @click="change2">折扣</li>
                  <li @click="change3">价格</li>
                  <li>筛选</li>
              </ul>
          </div>
      </div>
      <div class="nav">
        <span>免运</span><span>满688元全场免运</span>
      </div>
      <div class="list">
          <ul>
                <router-link
                    tag="li"
                    v-for="data in list"
                    :key="data.eventId"
                    :to="{
                    name:'lifedetail',
                    params:{
                        id:$route.params.id,
                        id2:data.productId
                        }
                    }"
                    >
                <div class="lifelist">
                    <img :src="data.imageUrl" alt="">
                    <div class="box">
                        <p>{{data.brandName}}</p>
                        <p>{{data.productName}}</p>
                        <span>￥{{data.price}}</span>
                        <del>￥{{data.marketPrice}}</del>
                        <span>{{data.discount}}折</span>
                    </div>

                </div>
                </router-link>
          </ul>
      </div>
      <div id="main" class="roll">
          <button @click.prevent="goTop" v-show="isShowimg === true">top</button>
      </div>
  </div>
</template>

<script>
import instance from '@/utils/http'

export default {
  props: ['id'],
  data () {
    return {
      list: [],
      isShowimg: false,
      title: ''
    }
  },
  computed: {
    sort1 () {
      return sortByKey(this.list, 'saleableQty')
    },
    sort2 () {
      return sortByKey(this.list, 'discount')
    },
    sort3 () {
      return sortByKey(this.list, 'price')
    }
  },
  methods: {
    goTop () {
      // 回到顶部
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.isShowimg = false
    },
    handleScroll (e) {
      // 滚动操作监听
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      let offsetTop = 0
      try {
        offsetTop = document.querySelector('.main').offsetTop
      } catch (e) {
        offsetTop = 0
      }
      if (scrollTop > offsetTop) {
        if (scrollTop > 200) {
          this.isShowimg = true
        } else {
          this.isShowimg = false
        }
      } else {
        this.isShowimg = false
      }
    },
    change1 () {
      this.list = this.sort1
    },
    change2 () {
      this.list = this.sort2
    },
    change3 () {
      this.list = this.sort3
    },
    back () {
      this.$router.back()
    }
  },
  mounted () {
    this.$store.commit('Show')
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    this.$store.commit('hide')
    document.removeEventListener('scroll', this.handleScroll)
  },
  // 这里就是接受动态id过来获取数据
  created () {
    instance.get(`/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1586502696552&summary=28e570a7a810047f329e79f624067adf&platform_code=H5`).then(res => {
      this.list = res.data.products
      this.title = res.data.eventName
    })
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
.roll{
    button{
        width: 0.4rem;
        height: 0.4rem;
        background:#fff;
        border-radius: 50%;
        position: fixed;
        bottom: 0.5rem;
        right: 0.2rem;
        opacity: 0.7;
    }
}
.top{
    width: 100%;
    height: 0.8rem;
    .header,.navs{
        width: 100%;
        height: 0.4rem;
    }
    .header{
        display: flex;
        .icon-icon-,
        .icon-gengduo {
            font-size: 24px;
            font-weight: 700;
            line-height: 0.4rem;
            width: 0.5rem;
        }
        p{
            flex:1;
            color:block;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            line-height: 0.4rem;
        }
    }
    .navs{
        ul{
            display: flex;
            li{
                flex: 1;
                text-align: center;
                float: left;
        }
        }
    }
}
.nav{
    width: 3.45rem;
    margin: auto;
    span:nth-of-type(1){
        border:1px red solid;
        color: red;
        font-size: 8px;
    }
    span:nth-of-type(2){
        margin-left: 0.05rem;
        font-size: 12px;
    }
}
.list{
    ul{
        display: flex;
        flex-wrap: wrap;
    }
    li{
        width: 50%;
        height: 3rem;
        .lifelist{
            img{
                display: block;
                width: 1.65rem;
                height: 2.2rem;
                margin: auto;
            }
            .box{
                width: 1.65rem;
                margin: auto;
                p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                p:nth-of-type(1){
                    color:black;
                    font-size: 12px;
                    font-weight: 700;
                }
                p:nth-of-type(2){
                    font-size: 12px;
                }
                span:nth-of-type(1){
                    color:red;
                    font-size: 12px;
                }
                span:nth-of-type(2){
                    margin-left:0.5rem;
                    font-size: 12px;
                }
                del{
                    font-size: 12px;
                    margin-left:0.1rem;
                    color:#ccc;
                }
            }
        }
    }
}
</style>
