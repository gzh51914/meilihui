<template>
    <div class="search" v-title="20">
        <section class="login">
            <p>登陆</p>
            <input type="text" class="txt" @click="more" placeholder="搜索.......">
            <i class="iconfont icon-liwu"></i>
        </section>
        <nav>
            <ul>
            <router-link tag="li" to="/home" active-class="active">推荐</router-link>
            <router-link tag="li" to="/crossborder" active-class="active">海外</router-link>
            <router-link tag="li" to="/women" active-class="active">女士</router-link>
            <router-link tag="li" to="/men" active-class="active">男士</router-link>
            <router-link tag="li" to="/cosmetics" active-class="active">美妆</router-link>
            <router-link tag="li" to="/lifestyle" active-class="active">家居</router-link>
            <router-link tag="li" to="/kids" active-class="active">婴童</router-link>
           <router-link tag="li" to="/upcoming" active-class="active">即将上新</router-link>
            </ul>

        </nav>
    </div>
</template>
<script>
import instance from '@/utils/http.js'
import { mapMutations } from 'vuex'
import Vue from 'vue'
Vue.directive('title', {
  inserted (el, binding) {
    el.style.backgroundColor = ''
    el.style.color = 'white'
    window.onscroll = () => {
      if (
        (document.body.scrollTop || document.documentElement.scrollTop) > binding.value) {
        el.style.backgroundColor = 'white'
        el.style.color = '#000'
      } else {
        el.style.backgroundColor = ''
        el.style.color = 'white'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  data () {
    return {
      navList: []
    }
  },
  created () {
    instance.get('/appapi/silo/navigationAll/v3?timestamp=1586352610892&summary=c8e043409b12f3148c14a31a264fe1ca').then(res => {
      // console.log(res.data.lists)
      this.navList = res.data.lists
    })
  },
  methods: {
    ...mapMutations([('Show')]),
    home () {
      this.$router.push('/home')
    },
    more () {
      this.$store.commit('Show')
    }
  }
}

</script>
<style lang="scss" scoped>
.active{
    border-bottom: 2px solid;
}
.search{
    height: 0.8rem;
    width: 100%;
    position: fixed;
    z-index: 20;
    left: 0;
    top: 0;
    transition: all 0.5s ease;
    // background: white;
    .login{
        height: 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0.15rem;
        p{
            width: 0.57rem;
            box-sizing: border-box;
            text-align: center;
        }
        .txt{
            height: 0.35rem;
            border: 0;
            flex: 1;
            background:#f5f5f5;
            border-radius: 0.04rem;
            padding-left: 0.2rem;
            font-size: 0.13rem;
        }
        i{
            width: 0.57rem;
            text-align: center;
        }
    }
    nav{
        height: 0.4rem;
        // background: white;
        display: flex;
        flex: 1;
        box-sizing: border-box;
        padding: 0 0.15rem;
        align-items: center;
        justify-content: space-between;
        ul{
            align-items: center;
            display: flex;
            flex-direction: row;
            overflow-x: auto;

        }
        li{
            margin-right: 0.2rem;
            flex-shrink: 0;
            flex-wrap: nowrap;
            font-size: 0.14rem;
            align-items: center;
            height: 100%;
        }
    }
}
</style>
