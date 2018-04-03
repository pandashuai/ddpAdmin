<template>
  <div class="wrapper">
    <header-view></header-view>
    <sidebar-view></sidebar-view>
    <div class="content" :class="{isSide:isSide,lm: mobileLayout}">
     <transition name="move" mode="out-in"><nuxt/></transition>
     </div>
      <pic-view></pic-view>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Sidebar from '~/components/Sidebar.vue';
import PicView from '~/components/picview.vue';
export default {
  mounted () {
    try{
      if(this.mobileLayout){
        // document.getElementById('__nuxt').setAttribute('class', 'ddp-lm')
        document.getElementsByTagName('body')[0].setAttribute('class', 'ddp-lm')
      }
    }catch(err){
    }
  },
  components: {
    HeaderView: Header,
    SidebarView: Sidebar,
    PicView
  },
  computed: {
    isSide() {
      return this.$store.state.option.isSide;
    },
    mobileLayout() {
      return this.$store.state.option.mobileLayout;
    }
  }
}
</script>
