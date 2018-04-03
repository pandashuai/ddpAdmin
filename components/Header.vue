<template>
  <div class="header" :class="{ml:mobileLayout}">
    <div class="logo" >后台管理系统</div>
    <el-button class="ddp-menu" @click="$store.commit('option/EDIT_ISSIDE_STATUS', !isSide)"><i class="iconfont icon-menu"></i></el-button>
    <div class="user-info" v-if="!mobileLayout" >
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link" v-if="data.user">
          <img class="user-logo" :src="data.cover">
          {{data.user}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Header',
    data() {
      return {
        name: 'ddp'
      }
    },
    computed: {
      data() {
        return this.$store.state.login.auth.data;
      },
      isSide() {
        return this.$store.state.option.isSide;
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      }
    },
    methods: {
      handleCommand(command) {
        if(command == 'loginout'){
          this.$logc.cookie.set('ddp_token', '')
          this.$store.dispatch('login/auth/reRoot', false);
          this.$router.push('/login');
        }
      }
    }
  }
</script>
<style scoped lang='scss'>

  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
    .logo{
      float: left;
      width:250px;
      text-align: center;
      
    }
  .ddp-menu{
      background: #242f42;
      border: 1px solid #414d60;
      color: #274373;
      &:hover{
        border: 1px solid #3c557d;
        color: #3c557d;
      }
    }
    .user-info {
      float: right;
      padding-right: 50px;
      font-size: 16px;
      color: #fff;
      .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
      }
      .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
      }
    }
    &.ml{
      .logo{
        text-align: left;
        padding-left: 10px;
         width: 140px;
      }
      .ddp-menu{
        float: right;
        margin-top: 15px;
        margin-right: 10px;
      }
    }
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
