<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item":class="{active: index===currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabControl",
    props:{
      titles:{
        type:Array,
        default(){
          return[]
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
  .tab-control-item{
    flex: 1;
    background-color: #fff;
  }
  .active{
    color: var(--color-high-text);
  }

  .tab-control-item span{
    padding: 5px;
  }

  .active span{
    border-bottom: solid var(--color-high-text);
  }
</style>
