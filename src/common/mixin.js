import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const ItemListenerMixin={
  data(){
    return{
      ItemImgListener:null,
      newRefresh:null
    }
  },
   mounted(){
    const refresh =debounce(this.$refs.scroll.refresh,100)
     this.ItemImgListener =()=>{
       refresh()
     }
     this.$bus.$on('itemImgLoad',this.ItemImgListener)
     console.log('混入的内容')
   }
}


export const  backTopMixin={
   components:{
     BackTop
   },
  data(){
     return{
       isShowBackTop:false
     }
  },
  methods:{
     backTop(){
       this.$refs.scroll.scrollTo(0,0,300)
     }
  }
}
