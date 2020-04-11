<template>
    <div class="goodsList">
        <div class="comming">
            <h3>今日上新</h3>
            <router-link
            tag="section"
            v-for="item in comeList"
            :key="item.eventId"
            :to="{
              name:'detial',
              params:{id:item.eventId}
            }"
            >
            <img :src="item.imageUrl" alt="">
            <aside>
                <p>{{item.englishName}}</p>
                <h4>{{item.discountText}}</h4>
                <h5>{{item.chineseName}}</h5>
            </aside>
            </router-link>
        </div>
        <div class="hotSale">
            <h3>热卖品牌</h3>
            <router-link
            tag="section"
            v-for="item in hotSale"
            :key="item.eventId"
            :to="{
              name:'detial',
              params:{id:item.eventId}
            }"
            >
            <img :src="item.imageUrl" alt="">
            <aside>
                <p>{{item.englishName}}</p>
                <h4>{{item.discountText}}</h4>
                <h5>{{item.chineseName}}</h5>
            </aside>
            </router-link>
        </div>
    </div>
</template>
<script>
import instance from '@/utils/http.js'
export default {
  data () {
    return {
      comeList: [],
      hotSale: []
    }
  },
  created () {
    instance.get('/appapi/home/eventForH5?params=%7B%7D&timestamp=1586349310741&summary=61cd01b7032ff8797d4f118e7f8448af&platform_code=H5').then(res => {
      // console.log(res.data.lists[0].events)
      this.comeList = res.data.lists[0].events
      this.hotSale = res.data.lists[1].events
    })
  }
}
</script>
<style lang="scss">
.goodsList{
   width: 100%;
    box-sizing: border-box;
    padding: 0 0.1rem;
  .comming,.hotSale{

      h3{
          height: 0.4rem;
          line-height: 0.4rem;
          color: #000;
          font-size: 0.2rem;
          font-weight: bold;
      }
      section{
          width: 100%;
          height: 1.80rem;
          margin: 0.1rem 0;
          position: relative;
          img{
              height: 100%;
          }
          aside{
              position: absolute;
              bottom: 0.15rem;
              left: .1rem;
              z-index: 10;
              color: #fff;
              font-size: 0.12rem;
              p{
                  font-size: 0.16rem;
              }
          }
      }
  }
}
</style>
