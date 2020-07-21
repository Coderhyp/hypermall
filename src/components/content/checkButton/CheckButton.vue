<template>
  <div class="check-button":class="{check :isChecked}">
    <img src="~assets/img/cart/tick.svg"  alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 0;
    border: 2px solid rgba(128, 128, 128, 0.41);
  }
  .check-button img{
    width: 18px;
    height: 18px;
  }

  .check{
    background-color: #ff002c;
    border-color: #ff002e;
  }
</style>
