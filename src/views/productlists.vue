<template>
  <div class="productLists">
       <nav class="topMenu">
           <li class="iconfont icon-icon- back" @click="handleBack"></li>
           <li class="title">{{title}}</li>
           <li class="iconfont icon-gengduo more" @click="more()">
               <ol class="moreLink" v-show="showMore">
                   <router-link
                        to = "/home"
                        tag = "li"
                    >
                        首页
                    </router-link>
                    <li>购物袋</li>
                    <li>个人中心</li>
                    <div class="iconfont icon-up arrow"></div>
               </ol>

           </li>
       </nav>
      <div class="listOrder" >
          <!-- <li :class="{'listActive':!flag}">人气</li>
          <li :class="{'listActive':flag}">折扣</li>
          <li :class="{'listActive':flag}">价格<i class="iconfont icon-down"></i></li>
          <li>筛选</li> -->
          <li
            v-for="(list,index) in listOrder"
            :key="list.name"
            :class="list.flag ? 'listActive' : ''"
            @click="toggleList(index)"
          >
            {{list.name}}
            <i :class="list.icon?`iconfont ${list.icon}`:''"></i>
          </li>
      </div>
      <div class="products">
          <div
            class="product"
            v-for="(item) in products"
            :key="item.productId"
            >
              <img :src="item.imageUrl" alt="">
              <p>
                  <span
                    v-for="(tags) in item.tagListDto"
                    :key="tags.index">
                    {{tags.tag}}
                  </span>
              </p>
              <p>{{item.brandName}}</p>
              <p>{{item.productName}}</p>
              <p>
                  <span class="price">￥{{item.price}}</span>
                  <span class="mPrice">￥{{item.marketPrice}}</span>
                  <span class="discount">{{item.discount}}折</span>
              </p>
          </div>
      </div>
      <div class="fixButton">
          <div class="iconfont icon-gouwudai cart"></div>
          <div class="iconfont icon-zhiding toTop" v-show="toTop" @click="backTop"></div>
      </div>
  </div>
</template>

<script>
import instance from '@/utils/http.js'

export default {
  data () {
    return {
      products: [],
      title: '',
      showMore: false,
      toTop: false,
      priceFlag: true,
      listOrder: [
        {
          name: '人气',
          flag: true
        },
        {
          name: '折扣',
          flag: false
        },
        {
          name: '价格',
          flag: false,
          icon: 'icon-down'
        },
        {
          name: '筛选',
          flag: false
        }
      ]
    }
  },

  created () {
    instance.get(`/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1586510220314&summary=55945672fbed180f9180422200d99b25&platform_code=H5`).then(res => {
      this.products = res.data.products
      this.title = this.$route.params.title
    })
  },
  mounted () {
    this.$store.commit('Show')
    // 监听滚动条
    window.addEventListener('scroll', this.top)
  },
  destroyed () {
    this.$store.commit('hide')
    window.removeEventListener('scroll', this.top)
  },
  methods: {
    handleBack () {
      this.$router.back() // 采用的编程式导航跳转
    },
    more () {
      this.showMore = !this.showMore
    },
    // 获取滚动条位置
    top () {
      const that = this
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (document.documentElement.scrollTop > 200) {
        this.toTop = true
      } else {
        this.toTop = false
      }
    },
    // 点击返回顶部
    backTop () {
      const that = this
      const timer = setInterval(() => {
        const ispeed = Math.floor(-that.scrollTop / 7)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 20)
    },
    // 按商品指定顺序排列
    toggleList (index) {
      if (this.listOrder[index].name === '折扣') {
        this.products.sort(function (a, b) {
          return a.discount - b.discount
        })
      }
      if (this.listOrder[index].name === '人气') {
        this.products.sort(function (a, b) {
          return a.saleableQty - b.saleableQty
        })
      }
      if (this.listOrder[index].name === '价格') {
        this.priceFlag = !this.priceFlag
        if (this.priceFlag) {
          this.listOrder[index].icon = 'icon-down'
          this.products.sort(function (a, b) {
            return a.price - b.price
          })
        } else {
          this.listOrder[index].icon = 'icon-up'
          this.products.sort(function (a, b) {
            return b.price - a.price
          })
        }
      }
      // 切换类名
      for (var i = 0; i < this.listOrder.length; i++) {
        this.listOrder[i].flag = false
      }
      this.listOrder[index].flag = true
    }

  }

}
</script>

<style lang="scss" scoped>
    .topMenu{
        width: 100%;
        height: 0.46rem;
        display: -webkit-flex;
        display: flex;
        .back,.more,.title{
            height: 100%;
            text-align: center;
            line-height: 0.46rem;
            color: #000;
        }
        .back,.more{
            width: 0.46rem;
            font-size: 22px;
        }
        .title{
            flex: 1;
            font-size: 18px;
        }
        .more{
            position: relative;
            ol{
                width: 1.2rem;
                height: 1.5rem;
                background-color: hsla(0,0%,96%,.96);
                position: absolute;
                right: 0;
                top: 0.5rem;
                font-size: 18px;
                padding: 0 0.2rem;
                li{
                    width: 100%;
                    height: 33%;
                    text-align: center;
                    border-bottom: 0.01rem solid #888;
                    &:last-of-type{
                        border-bottom: 0;
                    }
                }
                .arrow{
                position: absolute;
                top: -0.26rem;
                right: 0.12rem;
                font-size: 22px;
                color: hsla(0,0%,96%,.99);
                }
            }

        }
    }
    .listOrder{
        height: 0.4rem;
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
        text-align: center;
        line-height: 0.4rem;
        color: #888;
        li{
            width: 25%;
        }
        .listActive{
            color: #000;
            // .icon-down{
            //     transform: rotate(180deg);
            // }
        }
        .icon-down{
            display: inline-block;
        }
    }
    .products{
        display: -webkit-flex;
        display: flex;

        flex-wrap: wrap;
        .product{
            height: 3rem;
            width: 48%;
            color: #000;
            &:nth-child(odd){
                margin-right: 2%;
                margin-left:1%
            }
            img{
                width: 100%;
                height: 2.2rem;
            }
            p{
                &:nth-of-type(1){
                    font-size: 12px;
                    span{
                        display: inline-block;
                        margin-right: 0.03rem;
                        &:first-child{
                            border: 0.01rem solid #555;
                        }
                        &:nth-child(2){
                            background: #DD2828;
                            color: #fff;
                        }
                    }
                }
                &:nth-of-type(2){
                    font-size: 16px;
                }
                &:nth-of-type(3){
                    width: 100%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                &:nth-of-type(4){
                    width: 100%;
                    .price{
                        float: left;
                        margin-right: 0.02rem;
                        color: #DD2828;
                    }
                    .mPrice{
                        float: left;
                        font-size: 12px;
                        color: #ccc;
                        text-decoration-line: line-through;
                    }
                    .discount{
                        float: right;
                        margin-right: 0.12rem;
                        font-size: 12px;
                        color: #666;
                    }
                }
            }
        }
    }
    .fixButton{
        position: fixed;
        right: 0.2rem;
        bottom: 0.1rem;
        div{
            width: 0.46rem;
            height: 0.46rem;
            border-radius: 50%;
            background-color: rgba(238, 238, 238, 0.8);
            text-align: center;
            line-height: 0.5rem;
            font-size: 22px;
            color: #000;
            margin-bottom: 0.1rem;
        }
    }

</style>
