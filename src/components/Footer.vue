<template>
    <footer>
        <p>400 - 664 - 6698</p>
        <nav>
            <router-link
                to = "/home"
                tag = "li"
            >
                首页
            </router-link>
            <li>|</li>
            <li>客户端</li>
            <li>|</li>
            <li>个人中心</li>
        </nav>
        <p>copyright</p>
    </footer>
</template>

<script>

export default {

}
</script>
<style lang="scss" scoped>
    footer{
        color: #333;
        width: 100%;
        text-align: center;
        nav{
            display: flex;
            justify-content: center;
            margin: 0.1rem 0;
            li{
                margin:0 0.06rem
            }
        }
    }
</style>
