<template>
    <div class="men">
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
      this.$router.push(`/menlist/${id}`)
    }
  },
  created () {
    instance.get(`/appapi/silo/eventForH5?categoryId=men&pageIndex=
1&timestamp=1586355111061&summary=3b28475b7033f8aa
af6f128491833c19&platform_code=H5`).then(res => {
      // console.log(res)
      this.list = res.data.eventList
    })
  }
}
</script>
<style lang="scss" scoped>
.men{
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
