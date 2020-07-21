<template>
  <div id="detail" >
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>

     <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <!--属性：topImages 传入值：top-images-->
     <detail-swiper :top-images="topImages"></detail-swiper>
     <detail-base-info :goods="goods"></detail-base-info>
     <detail-shop-info :shop="shop"></detail-shop-info>
     <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" ></detail-goods-info>
     <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
     <detail-comments-info ref="comment" :comment-info="commentInfo"></detail-comments-info>
     <div>用户推荐</div>
     <goods-list ref="recommend" :goods="recommends"></goods-list>
   </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
<!--    <toast :message="message" :show="isShow"/>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentsInfo from "./childComps/DetailCommentsInfo";
  import GoodsListItem from "../../components/content/goods/GoodsListItem";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import {getDetail,getRecommend,GoodsInfo,Shop,GoodsParam} from "../../network/detail";
  import GoodsList from "../../components/content/goods/GoodsList";
  import {debounce} from "../../common/utils";
  import {backTopMixin, ItemListenerMixin} from "../../common/mixin";
  import {BACKTOP_DISTANCE} from "../../common/const";

  import {mapActions} from 'vuex'


  export default {
    name: "Detail",
    components:{
      DetailBottomBar,
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll,
      DetailParamInfo,
      DetailCommentsInfo,
      GoodsListItem,
      // Toast
    },
    mixins:[ItemListenerMixin,backTopMixin],
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        // message:'',
        // show:false
      }
    },
    created() {
      //1).保存传入的iid
      this.iid = this.$route.params.iid

      //2).根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取顶部图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages

        //2.1获取商品信息
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

        //2.2创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //2.3保存商品的详情数据(不用class)
        this.detailInfo = data.detailInfo

        //3.1获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //4.1获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        this.$nextTick(() => {
          //值不对的原因是图片没有计算在内
          //根据最新的数据，对应的DOM是已经被渲染出来
          //但是图片依然没有加载完（目前获取到的offsetTop不包含其中的图片）
          //offsetTop值不对的时候，都是因为图片的问题
          this.themeTopYs = []

          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        })

      })



      //3).请求推荐数据
      getRecommend().then(res =>{
        this.recommends=res.data.list
      })
      //4).给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖  会提高性能   防抖就是又做了一次函数的封装 等一会)
      this.getThemeTopY =debounce(()=>{
        {
          this.themeTopYs = []
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log(this.themeTopYs);
        }
      },100)

    },
    mounted() {
      // let newRefresh =debounce(this.$refs.scroll.refresh,100)
      // this.ItemImgListener =()=>{
      //   newRefresh()
      // }
      // this.$bus.$on('itemImgLoad',this.ItemImgListener)

    },


    destroyed() {
      this.$bus.$off('itemImgLoad',this.ItemImgListener)
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,1000)
      },
      contentScroll(position){
        //1.获取y值
        const positionY= -position.y

        //2.positionY和主题里的值进行对比


        //例：[0, 6262, 6843, 7077,Number.MAX_VALUE]
        // console.log(Number.MAX_VALUE);
        //positionY在0和6262之间  index=0
        //positionY在6262和6843之间  index=1
        //positionY在6843和7077之间  index=2
        //positionY在超过9120时  index=3
        let length=this.themeTopYs.length
        for ( let i=0;i<length-1 ;i++){
          // console.log(i+1);//这里的i当作字符串了 不可以

          // if(positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]){
          //   console.log(i)
          // }

          //hack方法实现
          if (this.currentIndex!=i && (positionY >= this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex
          }


          //普通方法实现
          // if(this.currentIndex !=i&&((i<length -1)&& positionY>=this.themeTopYs[i] && positionY < this.themeTopYs[i+1]||(i === length -1 && positionY>=this.themeTopYs[i])))
          // {
          //   this.currentIndex=i;
          //   console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex=this.currentIndex
          // }
        }
        //3.显示是否回到顶部
        this.isShowBackTop = -position.y > BACKTOP_DISTANCE
      },
      addToCart(){
        //1.获取需要在购物车里展示的信息
        const product ={}
          product.image=this.topImages[0];
          product.title=this.goods.title;
          product.desc=this.goods.desc;
          product.price=this.goods.lowNowPrice;
          product.iid = this.iid
        //2.将商品添加到购物车
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res)
        // })
        this.addCart(product).then(res=>{
          // this.show=true;
          // console.log(res)
          // this.message=res
          this.$toast.show(res,1000)
        })
        // setTimeout(()=>{
        //   this.show=false
        //   this.message=''
        // },1000)


      }
    }
  }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}

  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
