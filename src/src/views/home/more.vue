<template>
    <div class="more" >
        <section class="login">
            <input type="text" class="txt" placeholder="RPC进口水晶 全场2折起...">
            <i @click="hide">取消</i>
        </section>
        <div class="find">
          <h3>搜索发现</h3>
        </div>
        <section class="findList">
            <span
            v-for="(item,index) in moreList"
            :key="index"
            >
            {{ item.findKeyWord }}
            </span>
        </section>
    </div>
</template>

<script>
import instance from '@/utils/http.js'
// import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      moreList: []
    }
  },
  methods: {
    // ...mapMutations('home', ['hide']),
    hide () {
      this.$store.commit('hide')
    },
    back () {
      this.$router.push('/home')
    }
  },
  created () {
    instance.get('/appapi/search/searchFind/v3').then(res => {
      //    console.log(res.data.searchFindList);
      this.moreList = res.data.searchFindList
    })
  }
}
</script>

<style lang="scss" scoped>
.more{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 20;
    box-sizing: border-box;
    padding: 0 0.15rem;
}
.login{
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .txt{
        height: 0.35rem;
        border: 0;
        flex: 1;
        background:#f5f5f5;
        border-radius: 0.04rem;
        box-sizing: border-box;
        padding-left: 0.1rem;
        font-size: 0.12rem;
    }
     i{
            width: 0.57rem;
            text-align: center;
        }
}
.find{
    h3{
        height: 0.4rem;
        line-height: 0.4rem;
        color: #000;

    }
}
.findList{
        display: flex;
        flex-wrap: wrap;
        span{
            display: inline-block;
            width: 0.8rem;
            height: 0.5rem;
            line-height: 0.5rem;
            background: #f5f5f5;
            color: #000;
            margin-right: 0.3rem;
            text-align: center;
            margin-bottom: 0.2rem;
        }
    }
</style>
