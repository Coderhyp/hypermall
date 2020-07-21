import {
  ADD_COUNTER,
  ADD_TO_CART
}from'./mutation-types'
export default
{

  //mutations唯一的目的就是修改state中的状态
  //mutations中的每个方法尽可能完成的事件比较单一
  //1.payload新添加的商品
  //数组常用的方法：push/pop/unshift/shift/sort/reverse/map/filter/reduce。。。
  // let OldProduct =null;
  // for(let item of state.cartList){
  //   if (item.iid === payload.iid){
  //     OldProduct=item;
  //   }
  // }
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked=false
    state.cartList.push(payload)
  }

}
