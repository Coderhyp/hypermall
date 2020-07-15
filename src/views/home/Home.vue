<template>
  <div id="home" class="wrapper">
       <nav-bar class="home-nav">
      <div slot="center">Morty的商城</div>
    </nav-bar>
      <scroll class="content" ref="scroll" :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
       <home-swiper :banners="banners"></home-swiper>
       <recommend-view :recommends="recommends"></recommend-view>
       <FeatureView></FeatureView>
       <tab-control class="tabControl" :titles="['流行','新款','精选']"@tabClick="tabClick"></tab-control>
       <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
   </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import NavBar from "../../components/common/navbar/NavBar";

  import tabControl from "../../components/common/tabControl/tabControl";
  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";



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
      BackTop
    },
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
        isShowBackTop:false
      }
    },
    computed:{
      showGoods(){
      return this.goods[this.currentType].list
      }
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
      //3.监听Item中图片加载完成
      const refresh =this.debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })
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
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        // position.y>1000
        this.isShowBackTop=(-position.y)>1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
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
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 9;
  }

  .tabControl{
    /*position: sticky;*/
    top:44px;
    z-index: 9;
  }

  .content{
    overflow: hidden;
    position: absolute;
    bottom: 49px;
    top: 44px;
    left: 0;
    right: 0;
  }
  /*.content{*/
  /*  height: calc(100% - 98px);*/
  /*}*/
</style>
