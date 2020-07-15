<template>
 <div>
   <scroll class="content">
   <ul>
     <li>信息1</li>
     <li>信息2</li>
     <li>信息3</li>
     <li>信息4</li>
     <li>信息5</li>
     <li>信息6</li>
     <li>信息7</li>
     <li>信息8</li>
     <li>信息9</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
     <li>信息10</li>
   </ul>
   </scroll>
 </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";
  export default {
    name: "Profile",
    components:{
      Scroll
    }
  }
</script>

<style scoped>

  .content{
    height: 100px;
    background-color: greenyellow;
    overflow: hidden;

  }
</style>
