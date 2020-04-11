<template>
  <div>
      <div class="top">
          <div class="header">
              <i @click="back">回退</i>
              <span><!-- {{data.chineseName}} --></span>
              <span>功能</span>
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
              <li
                v-for="data in list"
                :key="data.glsCode"
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
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import instance from '@/utils/http'
export default {
  data () {
    return {
      list: []
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
    // sort4(){
    //       return sortByKey(this.list,'discount')
    //   }
  },
  methods: {
    change1 () {
      this.list = this.sort1
    },
    change2 () {
      this.list = this.sort2
    },
    change3 () {
      this.list = this.sort3
    },
    // change4(){
    //     this.list=this.sort4
    // },
    back () {
      this.$router.push('/men')
    }

  },
  mounted () {
    this.$store.commit('Show')
  },
  destroyed () {
    this.$store.commit('hide')
  },
  created () {
    instance.get(`/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1586523108522&summary=f4628ff981f13e81083e8f3bea58f37e&platform_code=H5
`).then(res => {
      this.list = res.data.products
      // console.log(res);
      // console.log(this.list);
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
.top{
    width: 100%;
    height: 0.8rem;
    .header,.navs{
        width: 100%;
        height: 0.4rem;
    }
    .header{
        display: flex;
        i{
            width: 0.5rem;
            line-height: 100%;
            height: 100%;
        }
        span:nth-of-type(1){
            flex:1;
            text-align: center;
            font-size: 18px;
            font-weight: 700;
        }
        span:nth-of-type(2){
            line-height: 100%;
            width: 0.5rem;
            font-size: 18px;
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
