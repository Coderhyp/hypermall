<template>
 <div class="cart">
<!--   导航-->
   <nav-bar class="nav-bar">
     <div slot="center">购物车({{length}})</div>
   </nav-bar>
<!--   商品列表-->
   <cart-list></cart-list>
    <cart-bottom-bar/>
 </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import {mapGetters}from'vuex'

  export default {
    name: "Cart",
    components:
      {
        CartList,
        NavBar,
        CartBottomBar
      },
    computed:{
      //两种语法
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
.nav-bar{
  background-color:var(--color-tint);
  color:#ffffff;
}
</style>
