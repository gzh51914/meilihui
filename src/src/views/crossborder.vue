<template>
    <div class="oversea">
        <!-- sia -->
        <!-- 海外banner -->
        <div class="overseaBanner">
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

        <!-- 海外lists -->
        <div class="overseaLists">
            <div
                class="lists"
                v-for="(event) in lists"
                :key="event.eventcode"
            >
                <img :src="event.imageUrl" alt="">

                <div class="eDetail">
                    <i>{{event.siloCategory + '直发'}}</i>
                    <p class="eDeTitle">{{event.englishName}}</p>
                    <p>{{event.chineseName}}</p>
                    <p>{{event.discountText}}</p>
                </div>
            </div>
        </div>
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
      lists: []
    }
  },
  created () {
    instance.get('/appapi/home/mktBannerApp/v3?silo_id=2013000100000000011&platform_code=PLATEFORM_H5').then(res => {
      this.banners = res.data.banners
    })
    instance.get('/appapi/silo/eventForH5?categoryId=crossborder&pageIndex=1&timestamp=1586354575399&summary=1e06347a2a16159411ecbb990ab501c2&platform_code=H5').then(res => {
      this.lists = res.data.eventList
    })
  }
}
</script>
<style lang="scss" scoped>
.oversea{
    // margin-top: 0.8rem;
    color: #fff;
    .overseaBanner{
        width: 100%;
        height: 4.6rem;
        position: relative;

        img{
            width: 100%;
            height: 100%;
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

    .overseaLists{
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
                background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.55));
                i{
                    // display: block;
                    font-size: 12px;
                    color: #333;
                    background: #fff;
                    border-radius: 0.01rem;
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
