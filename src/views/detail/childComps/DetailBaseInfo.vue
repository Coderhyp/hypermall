<template>
  <div v-if="Object.keys(goods).length !==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="oPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount"> {{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1":key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>


  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        default(){
          return{}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info{
    margin-top: 10px;
  }
.info-title{
  font-weight: bold;
  color: black;

}
  .info-price {
    margin-top: 10px;
    font-size: 28px;
  }
.info-price .n-price{
  color: #f47474;
}
  .info-price .oPrice{
    font-size: 14px;
    text-decoration: line-through;
  }
 .info-price .discount{
   font-size: 12px;
   padding: 2px 5px;
   color: #fff;
   background-color: var(--color-high-text);
   border-radius: 8px;
   margin-left: 5px;

   position: relative;
   top: -8px;
 }
  .info-other{
    margin-top: 20px;
    display: flex;
    font-size: 10px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-services{
    display: flex;
    font-size: 10px;
    justify-content: space-between;
    line-height: 60px;
  }
  .info-services .info-services-item img{
    height: 10px;
    weight: 10px;
    position: relative;
  }


</style>
