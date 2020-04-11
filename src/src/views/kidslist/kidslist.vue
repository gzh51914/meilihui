<template>
  <div>
      <div class="top">

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
  mounted () {
    this.$store.commit('Show')
  },
  destroyed () {
    this.$store.commit('hide')
  },
  created () {
    instance.get(`/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1586502696552&summary=28e570a7a810047f329e79f624067adf&platform_code=H5`).then(res => {
      this.list = res.data.products
      // console.log(res);
      console.log(this.list)
    })
  }
}
</script>

<style lang="scss" scoped>
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
                    font-size: 14px;
                    font-weight: 700;
                }
                p:nth-of-type(2){
                    font-size: 14px;
                }
                span:nth-of-type(1){
                    color:red;
                    font-size: 14px;
                }
                span:nth-of-type(2){
                    margin-left:0.5rem;
                    font-size: 14px;
                }
                del{
                    font-size: 14px;
                    margin-left:0.1rem;
                    color:#ccc;
                }
            }
        }
    }
}
</style>
