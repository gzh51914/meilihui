<template>
    <div class="lady">
        <img src="https://img.alicdn.com/tfs/TB1WQ91o4z1gK0jSZSgXXavwpXa-750-900.jpg" alt="">
       <div class="list">
        <ul>
          <li
            v-for="data in list"
            :key="data.eventId"
             @click="tolist(data.eventId)"
          >
          <div class="box">
            <img :src="data.imageUrl" alt="">
            <div class="title">
              <h3>{{data.englishName}}</h3>
              <h4>{{data.chineseName}}</h4>
              <h5>{{data.discountText}}</h5>
            </div>
          </div>
          </li>
        </ul>
      </div>
    </div>

</template>
<script>
import instance from '@/utils/http.js'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    tolist (id) {
      this.$router.push(`/womenlist/${id}`)
    }
  },
  created () {
    instance.get(`/appapi/silo/eventForH5?categoryId=women&pageIndex=1&timestamp=15863548
33454&summary=07e6f89d8f1cd0dd4a8056bd1ff09fcc&platform_code=H5`).then(res => {
      // console.log(res)
      this.list = res.data.eventList
    })
  }

}
</script>
<style lang="scss" scoped>
.lady{
    img{
          width: 3.75rem;
        height: 4.5rem;
    }
}
.list{
  li{
    width: 100%;
    padding:0.1rem;
    .box{
      position: relative;
      img{
        width: 3.55rem;
        height: 2.1rem;
      }
      .title{
        width: 100%;
        position: absolute;
        bottom: 0.1rem;
        left:0.1rem;
        h3,h4,h5{
          color:#fff;
        }
      }
    }

  }
}
</style>
