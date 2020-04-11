<template>
    <div class="shoppingCar">
        <p>
            <i class="iconfont icon-gouwudai"></i>
            <span>购物袋</span>
        </p>
        <button class="car">加入购物车</button>
        <button class="buy">立即购买</button>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .shoppingCar{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 0.6rem;
        background: #fff;
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding: 0 .15rem;
        border-top: 1px solid #f5f5f5;
        p{
            width: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .iconfont{
                font-size: 0.3rem;
                color: #000;
            }
            span{
                font-size: .14rem;
            }
        }
        button{
            height: 100%;
            border:0;
            background: #fff;
            text-align: center;
            line-height: 100%;
            flex: 1;
            font-size: 0.18rem;
            vertical-align: middle;
        }
        .add{
            border-right:  1px solid #f5f5f5;
        }
        .buy{
            color: red;
        }
    }
</style>
