<template>
  <div id="home" class="wrapper">
       <nav-bar class="home-nav">
      <div slot="center">Morty的商城</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed">
    </tab-control>
      <scroll class="content" ref="scroll" :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
       <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
       <recommend-view :recommends="recommends"></recommend-view>
       <FeatureView></FeatureView>
       <tab-control class="tabControl" :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2">
       </tab-control>
       <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
   </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import NavBar from "../../components/common/navbar/NavBar";

  import tabControl from "../../components/common/tabControl/tabControl";
  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  // import BackTop from "../../components/content/backTop/BackTop";   //因为用了mixin所以可以注释掉
  import {ItemListenerMixin,backTopMixin} from "../../common/mixin";
  import {BACKTOP_DISTANCE} from "../../common/const";



  export default {
    name: "Home",
    components: {
      RecommendView,
      NavBar,
      HomeSwiper,
      FeatureView,
      tabControl,
      GoodsList,
      Scroll,
      // BackTop
    },
    mixins:[ItemListenerMixin,backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page: 0,list: []},
          'new':{page: 0,list: []},
          'sell':{page: 0,list: []},
        },
        currentType:'pop',
        // isShowBackTop:false,  //因为用了mixin所以可以注释掉
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        ItemImgListener:null
      }
    },
    computed:{
      showGoods(){
      return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY)
      this.$refs.scroll.refresh()

    },
    deactivated() {
      // 1. 保存y值
      this.saveY = this.$refs.scroll.getScrollY()

      //取消全局事件监听
      this.$bus.$off('itemImgLoad',this.ItemImgListener)
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // //1.监听Item中图片加载完成
      // const refresh =debounce(this.$refs.scroll.refresh,100)
      // // //对监听事件进行保存
      // this.ItemImgListener =()=>{
      //   refresh()
      // }
      // this.$bus.$on('itemImgLoad',this.ItemImgListener)
    },
    methods:{
      /**事件监听相关方法*/
      debounce(func,delay){
        let timer=null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer=setTimeout(()=>{
            func.apply(this,args)
          },delay)
        }
      },
      tabClick(index){
      switch (index) {
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
       }
       //让两个TabControl的currentIndex保持一致
       this.$refs.tabControl1.currentIndex=index;
       this.$refs.tabControl2.currentIndex=index;
      },
      //因为用了mixin所以可以注释掉
      // backTop(){
      //   this.$refs.scroll.scrollTo(0,0)
      // },
      contentScroll(position){
        //1.判断backTop是否显示
        // position.y>1000
        this.isShowBackTop=(-position.y)>BACKTOP_DISTANCE

        //2.决定TabControl是否吸顶 （给position：fixed）
        this.isTabFixed =(-position.y)>this.tabOffsetTop


      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        //2.获取tabControl的offsetTop
        //所有组件都有一个属性$el:用于获取组件中的元素
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
      },

      /**网络请求相关方法*/
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
        getHomeGoods(type) {
        const page=this.goods[type].page+1
          getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page +=1

            this.$refs.scroll.finishPullUp()
          })
        }
      }

  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*使用浏览器的原生滚动时，为了不让导航栏跟随滚动条一起滚动  使用BS就不用了*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top:0;*/
    /*z-index: 9;*/
  }

  .content{
    overflow: hidden;
    position: absolute;
    bottom: 49px;
    top: 44px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }

  /*.content{*/
  /*  height: calc(100% - 98px);*/
  /*}*/
</style>
