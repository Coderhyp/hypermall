import {
  ADD_COUNTER,
  ADD_TO_CART
}from'./mutation-types'

export default
{

  addCart(context,payload){
    return new Promise((resolve, reject) => {
      let OldProduct=context.state.cartList.find(item=> item.iid === payload.iid)
      //2.判断OldProduct
      if(OldProduct){//数量加1
        // OldProduct.count+=1
        context.commit(ADD_COUNTER,OldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count=1
        // context.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })


  }
}
