<template>
  <div class="CarBottomBar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="checkButton" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计{{totalPrice}}
    </div>
    <div class="calculate" @click="calClick">
       结算商品({{checkLength}})
    </div>
  </div>

</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import { mapGetters }from'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥'+this.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count
        },0)
      },
      checkLength(){
        return this.cartList.filter(item=>item.checked).length
      },
      isSelectAll(){
        if(this.cartList.length===0) return false
        //1.使用filter
        // return !(this.cartList.filter(item=>!item.checked).length)
        //2.使用find
        return !this.cartList.find(item=>!item.checked)
        //3.使用常规遍历
        // for(let item of this.cartList){
        //   if(!item.checked){
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){  //全部选中
          this.cartList.forEach(item=>item.checked=false)
        }
        else {
          this.cartList.forEach(item=>item.checked=true)
        }
        //这里代码不可以简化成this.cartList.forEach(item=>item.checked=！this.isSelectAll)
      },
      calClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择需要购买的商品')
      }
      }

    }
  }
</script>

<style scoped>
  .CarBottomBar{
    height: 40px;
    background-color: #ffffff;
    position: relative;
    line-height: 40px;
    display: flex;
    font-size: 15px;
    border-top:solid 1px #7f7e7e
  }
  .check-content{
    display: flex;
    align-items: center;
    width: 60px;
  }
  .checkButton{
  width: 20px;
    height: 20px;
    line-height: 22px;
  }
  .price{
    margin-left: 30px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    border-radius:15px;
    background-color:  #ffe817;

  }
</style>
