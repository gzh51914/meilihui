<template>
    <div class="search" v-title="20">
        <section class="login">
            <p>登陆</p>
            <input type="text" class="txt" @click="more">
            <i>取消</i>
        </section>
        <nav>
            <!-- <p @click="home">推荐</p> -->
            <!-- <router-link  to="/"
            v-for="(item) in navList"
            :key="item.categoryId"
            >
               {{item.name}}
            </router-link> -->
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
    home () {
      this.$router.push('/home')
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
            opacity: 0.5;
            margin-top: 0.1rem;
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
