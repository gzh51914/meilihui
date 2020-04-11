<template>
    <div class="cosmetics">
        <!-- sia -->
        <!-- 美妆banner -->
        <div class="cosmeticsBanner">
            <Swiper cName="swipe">
            <div
                class="swiper-slide"
                v-for="(banner,index) in banners"
                :key="banner.name"
                v-swiper="{
                    current:index,
                    length:banners.length,
                    swipe:'swipe'
                }"
            >
                <img :src="banner.main_image" alt="">
                <div class="title">
                    <h2>{{banner.main_title}}</h2>
                    <h3>{{banner.sub_title}}</h3>
                    <h4>{{banner.description}}</h4>
                </div>
            </div>
        </Swiper>
        </div>

        <!-- 美妆导航 -->
        <div class="cosmeticsNav">
            <div
                class="navList"
                v-for="(nav) in navs"
                :key="nav.categoryImgStr"
            >
                <img :src="nav.categoryImgStr" alt="">
            </div>
        </div>

        <!-- 美妆lists -->
        <div class="cosmeticsLists">
            <router-link
                class="lists"
                v-for="(event) in lists"
                :key="event.eventcode"
                :to="{
                    name:'productlists',
                    params:{id:event.urlkey.split('-')[0],
                    title:event.chineseName}
                }"
                tag="li"
            >
                <img :src="event.imageUrl" alt="">

                <div class="eDetail">
                    <div>{{event.siloCategory === "海外" ?  event.siloCategory + '直发' : " "}}</div>
                    <p class="eDeTitle">{{event.englishName}}</p>
                    <p>{{event.chineseName}}</p>
                    <p>{{event.discountText}}</p>
                </div>
            </router-link>
        </div>
        <!-- 底部 -->
        <BottomF></BottomF>

    </div>

</template>
<script>
import Swiper from '@/components/Swiper'
import instance from '@/utils/http.js'
import BottomF from '@/components/Footer'
export default {
  components: {
    Swiper, // 注册组件Swiper
    BottomF
  },
  data () {
    return {
      banners: [],
      lists: [],
      navs: []
    }
  },
  created () {
    instance.get('/appapi/home/mktBannerApp/v3?silo_id=2013000100000000003&platform_code=PLATEFORM_H5').then(res => {
      this.banners = res.data.banners
    })
    instance.get('/appapi/silo/eventForH5?categoryId=cosmetics&pageIndex=1&timestamp=1586355235793&summary=0d42ba31004c3783c834abcfb20c68d9&platform_code=H5').then(res => {
      this.lists = res.data.eventList
    })
    instance.get('/appapi/cms/cmsDetail/v3?silo=2013000100000000003&ids=2042000100000000431&timestamp=1586355433603&summary=7fa0eb64b151704cdde8f4fa5535c9fa&platform_code=H5').then(res => {
      this.navs = res.data.resultList[0].data
    })
  },
  methods: {
    toDetail (id, title) {
      this.$router.push(`/productlists/${id}&${title}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.cosmetics{
    // margin-top: 0.8rem;
    color: #fff;

    // banner
    .cosmeticsBanner{
        width: 100%;
        height: 4.6rem;
        position: relative;

        img{
            width: 100%;
            // height: 100%;
        }
        .title{
            width: 100%;
            position:absolute;
            bottom:0.6rem;
            text-align: center;
            h2{
                font-size: 28px;
                font-weight: 600;
                margin-bottom: 0.05rem;
            }
        }
    }

    // 导航
    .cosmeticsNav{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        img{
            width: 0.68rem;
            height: 0.9rem;
        }
    }
    // 列表
    .cosmeticsLists{
        width: 100%;
        overflow: hidden;
        .lists{
            width: 3.4rem;
            height: 2.2rem;
            margin: 0 0.16rem;
            margin-bottom: 0.2rem;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .eDetail{
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                padding: 0 0 0.08rem 0.08rem;
                background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));
                div{
                    // display: block;
                    height: 0.1rem;
                    margin-bottom: 0.02rem;
                }
                p{
                    font-size: 15px;
                    margin-bottom: 0.02rem;

                }
                .eDeTitle{
                        font-size: 17px;
                }
            }
        }
    }
}
</style>
