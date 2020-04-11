<template>
    <div class="goodsInfo">
        <div class="title">
          <section>
            <i class="iconfont icon-icon-" @click="handleBack"></i>
            <p><span>{{infosList.brand}}</span><em>￥{{infosList.price}}</em></p>
            <span class="iconfont icon-gengduo"></span>
          </section>
        </div>
        <!-- 轮播图 -->
        <div class="ziky">
        <Swiper cName='banner'>
            <div
            class="swiper-slide"
            v-for="(item,index) in infosList.images"
            :key="index"
             v-swiper="{
                    current:index,
                    length:infosList.images.length,
                    swipe:'banner',
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
            <img :src="item.smallImgUrl" alt="">
            </div>
        </Swiper>
       </div>
       <div class="cont">
           <h2>{{ infosList.name }}</h2>
           <del>￥{{ infosList.marketPrice }}</del>
           <section>
               <span>￥{{infosList.price}}</span>
               <em>{{ discount }}折</em>
               <!-- <i></i> -->
           </section>
           <p><span>{{infosList.warehouse_name}}</span><i class="iconfont icon-shijian"></i>{{ Time }}</p>
       </div>
       <!-- 服务 -->
       <div class="service">
           <section class="sec_1">
               <h3>闪购</h3>
           </section>
           <!-- <section v-html="infosList.sizeMeasure.howMeasue">
               服务
           </section> -->
           <section class="sec_2">
               <h3>服务</h3>
               <p>
                   <span
                   v-for="(item,index) in infosList.service_labels"
                   :key="index"
                   >
                   {{item.label_title}}
                   <em></em>
                   </span>
               </p>
           </section>
           <section class="sec_3">
               <h3>尺码</h3>
               <p>
                   <span
                   v-for="(item) in infosList.size"
                   :key="item.sizeId"
                   >
                   {{ item.sizeLabel }}
                   </span>
               </p>
           </section>
       </div>
       <!-- 商品参数 -->
       <div class="parameter">
           <section>
               <h2>商品参数</h2>
               <aside>
                   <img :src="parameterImg" alt="">
               </aside>
               <ul>
                   <li
                   v-for="(data,index) in describe"
                   :key="index"
                   >
                   <label for="">{{data.name}}</label>
                   <span>{{data.value}}</span>
                   </li>
               </ul>
           </section>
       </div>
       <!-- 尺码信息 -->
       <div class="sizeInfo">
           <section>
               <aside>
                   <h2>尺码信息</h2>
                   <p>单位</p>
                   <h5>尺码指南</h5>
               </aside>
               <div class="ulList">
                   <ul
                    v-for="(item,index) in sizeInfo"
                    :key="index"
                   >
                    <li
                        v-for="(data,idx) in item"
                        :key="idx"
                    >
                        {{data}}
                    </li>
                   </ul>
               </div>
           </section>
       </div>
       <!-- 洗护和保养 -->
       <!-- 商品详情 -->
       <div class="details">
           <h2>商品详情</h2>
           <p>{{ design }}</p>
           <section
           v-for="(item,idx) in detialsImg"
           :key="idx"
           >
                <aside>
                    <img width="100%" :src="item.bigImgUrl" alt="">
                </aside>
           </section>
           <p>{{ messageInfo }}</p>
       </div>
       <!-- 加入购物车/购买 -->
      <Car></Car>
        <!-- <p>{{id2}}</p> -->
    </div>
</template>

<script>
import Swiper from '@/components/Swiper.vue'
import instance from '@/utils/http.js'
import Car from './shoppingCar'
export default {

  props: ['id', 'id2'],
  data () {
    return {
      infosList: [],
      discount: '',
      Time: '',
      parameterImg: [],
      detialsImg: [],
      describe: [],
      design: [],
      messageInfo: '',
      sizeInfo: []
    }
  },
  methods: {
    handleBack () {
    // this.$router.back()
    // 当用户点击back的时候，希望调用者来去决定做什么样的功能
      this.$router.back()
    }
  },
  components: {
    Swiper,
    Car
  },
  created () {
    instance.get(`appapi/product/detail/v3?categoryId=${this.$route.params.id}&productId=${this.$route.params.id2}&platform_code=H5&timestamp=1586515333736&summary=3be1372dafb3610c6a307b8f13b7489c`).then(res => {
      // console.log(res.data.infos.sizeMeasure.sizeTable);
      this.infosList = res.data.infos // 所有数据
      this.discount = res.data.infos.itemPriceDto.discount // 折扣
      this.Time = res.data.infos.deliver_date // 发货时间
      this.parameterImg = res.data.infos.description.material_quality_img // 详情图片
      this.detialsImg = res.data.infos.description.product_img1 // 参数图片
      this.describe = res.data.infos.description.attributesList // 描述信息
      this.design = res.data.infos.description.design // 详情线面的数据
      this.messageInfo = res.data.infos.description.message // 以实物为准
      this.sizeInfo = res.data.infos.sizeMeasure.sizeTable// 尺码信息
    })
  },
  mounted () {
    this.$store.commit('Show')
  },
  destroyed () {
    this.$store.commit('hide')
  }
}
</script>

<style lang="scss" scoped>
.goodsInfo{
    margin: 0.4rem 0 0.6rem 0;
    background: #fff;
    box-sizing: border-box;
    padding: 0 0.15rem;
     .title{
          box-sizing: border-box;
    padding: 0 0.15rem;
      height:.4rem;
      width:100%;
      background: #fff;
      position: fixed;
      top:0;
      left:0;
      text-align: center;
      z-index:12;
      section{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;
        p{
            display: flex;
            flex-direction: column;
            justify-content: start;
            font-size: 0.16rem;
            em{
                font-size: 0.12rem;
                color: red;
            }
        }
      }
      .sort{
      height: 0.3rem;
        }
    }
    .ziky{
        margin-bottom: 0.05rem;
        img{
            width: 100%;
        }
    }
    .cont{
        h2{
            color: #000;
            font-size: 0.2rem;
            margin-bottom: 0.04rem;
        }
        del{
            font-size: 0.12rem;
        }
        section{
            display: flex;
            align-items: center;
            margin-bottom: 0.05rem;
            span{
                color: red;
                margin-right: 0.06rem;
                transform: scale(0.9);
            }
             em{
                display: inline-block;
                width: 0.6rem;
                height: 0.24rem;
                text-align: center;
                line-height: 0.24rem;
                border: 1px solid #000;
                transform: scale(0.9);
            }
        }
        p{
            span{
                color: #000;
                margin-right: 0.05rem;
            }
        }
    }
    //服务
     .service{
        height: 100%;
        width: 100%;
        border: 1px solid #f5f5f5;
        .sec_1{
            border-bottom: 1px solid #f5f5f5;
            height: 0.6rem;
            display: flex;
            align-items: center;
            h3{
               font-size: 0.14rem;
            }

        }
        .sec_2{
            h3{
                width: 0.8rem;
                font-size: 0.16rem;
            }
            height: 0.6rem;
            font-size: 0.16rem;
            display: flex;
            justify-content: start;
            align-items: center;
            border-bottom: 1px solid #f5f5f5;
            p{
                span{
                    font-size: 0.12rem;
                    em{
                        display: inline-block;
                        height: 0.2rem;
                        width: 2px;
                        background: #ccc;
                        margin: 0 0.06rem;
                        vertical-align: middle;
                        &nth:nth-last-of-type(1){
                            display: none
                        }
                    }
                }
            }
        }
        .sec_3{
            display: flex;
            height: 0.8rem;
            align-items: center;
            h3{
                width: 0.8rem;
                font-size: 0.14rem;
            }
            p{
                span{
                    display: inline-block;
                    width: 0.3rem;
                    height: 0.3rem;
                    background: #f5f5f5;
                    line-height: 0.3rem;
                    text-align: center;
                    color: #000;
                    margin-right: 0.1rem;
                }
            }
        }
    }
    //商品参数
    .parameter{
        border-bottom: 1px solid #f5f5f5;
        section{
            h2{
                font-weight: bold;
                height: 0.6rem;
                line-height: .6rem;
                color: #000;
                font-size: 0.2rem;
            }
            aside{
                img{
                    // height: 100%;
                    width: 100%
                }
            }
            ul{
                padding-left: 0.15rem;
                li{
                    font-size: .12rem;
                    margin: 0.15rem 0;
                    label{
                        display: inline-block;
                        width: 1.2rem;
                        color: #999
                    }
                    span{
                        color: #000;
                    }
                }
            }
        }
    }
    // 尺码信息
    .sizeInfo{
        border-bottom: 1px solid #f5f5f5;
        section{
            aside{
                height: 0.6rem;
                vertical-align: baseline;
                line-height: 0.6rem;
                h2{
                    color: #000;
                    font-size: 0.2rem;
                    font-weight: bold;
                    margin-right: 0.2rem;
                    float: left;
                }
                p{
                    font-size: 0.14rem;
                    float: left;
                }
                h5{
                    text-align: right;
                }
            }
        }
        .ulList{
            display: flex;
            overflow-x: scroll;
            ul{
                flex-wrap: nowrap;
                flex-direction: row;
                flex-shrink: 0;
                margin-bottom: 0.3rem;
                width: 25%;
                font-size: 0.14rem;
                text-align: center;
                &:nth-child(1){
                    color: #000;
                    border-right: 0.04rem solid #ccc;
                    text-align: left;
                }
                li{
                    overflow-x: auto;
                     flex-shrink: 0;
                    height: 25px;
                    line-height: 25px;
                    &:nth-child(odd){
                        background: #f5f5f5;
                    }
                }
            }
        }
    }
    // 洗护和保养

    // 商品详情
    .details{
        h2{
            color: #000;
            font-size: 0.2rem;
            font-weight: bold;
            margin: .2rem 0 .1rem 0;
        }
        p{
            font-size: 0.14rem;
            color: #000;
        }
    }
}
</style>
