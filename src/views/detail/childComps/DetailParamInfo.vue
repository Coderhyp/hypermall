<template>
<div class="param-info" v-if="Object.keys(paramInfo).length!=0">
  <table v-for="(table, index) in paramInfo.sizes" class="info-size" :key="index">
    <tr v-for="(tr,y) in table" :key="y">
      <td v-for="(td,z) in tr" :key="z">{{td}}</td>
      <!--  indey indez索引值    -->
    </tr>
  </table>
  <table class="info-param">
    <tr v-for="(info, index) in paramInfo.infos">
      <td class="info-param-key">{{info.key}}</td>
      <td class="param-value">{{info.value}}</td>
    </tr>
  </table>
  <div class="info-img" v-if="paramInfo.image.length !=0">
    <img :src="paramInfo.img" alt="">
  </div>
</div>

</template>

<script>
  export default {
    name: "DetailParamInfo",
    props:{
      paramInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
.param-info{
  font-size: 13px;
  border-bottom: solid grey;
}
  .param-info table{
    width: 100%;
    border-collapse: collapse;
  }
.param-info table tr{
    height: 32px;

}
  .param-info table tr td{
    width: 30px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}
.info-param {
  border-top: 1px solid rgba(0,0,0,.1);
}
.param-value {
  color: #0076a0
}
.info-img img {
  width: 100%;
}
</style>
