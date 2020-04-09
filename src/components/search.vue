<template>
    <div class="search">
        <section class="login">
            <p>登陆</p>
            <input type="text" class="txt">
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
            <router-link tag="li" to="/home">推荐</router-link>
            <router-link tag="li" to="/crossborder">海外</router-link>
            <router-link tag="li" to="/women">女士</router-link>
            <router-link tag="li" to="/men">男士</router-link>
            <router-link tag="li" to="/cosmetics">美妆</router-link>
            <router-link tag="li" to="/lifestyle">家居</router-link>
            <router-link tag="li" to="/kids">婴童</router-link>
           <router-link tag="li" to="/upcoming">即将上新</router-link>
            </ul>
          
        </nav>
    </div>
</template>
<script>
import instance from "@/utils/http.js"
export default {
    data(){
        return {
           navList:[],
        }
    },
    created(){
        instance.get("/appapi/silo/navigationAll/v3?timestamp=1586352610892&summary=c8e043409b12f3148c14a31a264fe1ca").then(res=>{
            console.log(res.data.lists);
            this.navList=res.data.lists
        })
    },
    methods:{
        home(){
            this.$router.push('/home')
        },        
    }
}
        
</script>
<style lang="scss" scoped>
.search{
    height: 0.8rem;
    width: 100%;
    position: fixed;
    z-index: 20;
    left: 0;
    top: 0;
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
            height: 100%;
            border: 0;
            flex: 1;

        }
        i{
            width: 0.57rem;
            text-align: center;
        }
    }
    nav{
        height: 0.4rem;
        // background: pink;
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
            margin-right: 0.3rem;
            flex-shrink: 0;
            flex-wrap: nowrap;
            font-size: 0.14rem;
            align-items: center;
        }
    }
}
</style>