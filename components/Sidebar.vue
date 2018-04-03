<template>
    <div class="sidebar" :class="{isSide: isSide}">
        <el-menu 
            :default-active="onRoutes"
            class="el-menu-vertical-demo" 
            background-color="#2E363F"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
            @select="selectMenu">
            <el-menu-item index="/readme">
                <i class="el-icon-info"></i>
                <span slot="title">自述</span>
            </el-menu-item>
            <el-menu-item index="/qiniu">
                <i class="el-icon-upload"></i>
                <span slot="title">七牛平台资源管理</span>
            </el-menu-item>
            <el-submenu index="/blog">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span>博客管理</span>
                </template>
                <el-menu-item index="/blog/ico">前台图标</el-menu-item>
                <el-menu-item index="/blog/option">整站配置</el-menu-item>
                <el-submenu index="/blog/announcement">
                    <template slot="title">公告管理</template>
                    <el-menu-item index="/blog/announcement/create">创建</el-menu-item>
                    <el-menu-item index="/blog/announcement/list">列表</el-menu-item>
                </el-submenu>
                <el-submenu index="/blog/category">
                    <template slot="title">分类管理</template>
                    <el-menu-item index="/blog/category/create">创建</el-menu-item>
                    <el-menu-item index="/blog/category/list">列表</el-menu-item>
                </el-submenu>
                <el-submenu index="/blog/tag">
                    <template slot="title">标签管理</template>
                    <el-menu-item index="/blog/tag/create">创建</el-menu-item>
                    <el-menu-item index="/blog/tag/list">列表</el-menu-item>
                </el-submenu>
                <el-submenu index="/blog/article">
                    <template slot="title">文章管理</template>
                    <el-menu-item index="/blog/article/create">创建</el-menu-item>
                    <el-menu-item index="/blog/article/list">列表</el-menu-item>
                </el-submenu>
                <el-submenu index="/blog/comment">
                    <template slot="title">评论管理</template>
                    <!-- <el-menu-item index="/blog/comment/create">创建</el-menu-item> -->
                    <el-menu-item index="/blog/comment/list">列表</el-menu-item>
                </el-submenu>
            </el-submenu>
             <el-submenu index="/rbac">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>权限设置</span>
                </template>
                <el-submenu index="/rbac/user">
                    <template slot="title">用户管理</template>
                    <el-menu-item index="/rbac/user/create">创建</el-menu-item>
                    <el-menu-item index="/rbac/user/list">列表</el-menu-item>
                </el-submenu>
                <el-submenu index="/rbac/role">
                    <template slot="title">角色管理</template>
                    <el-menu-item index="/rbac/role/create">创建</el-menu-item>
                    <el-menu-item index="/rbac/role/list">列表</el-menu-item>
                </el-submenu>
                <el-submenu index="/rbac/node">
                    <template slot="title">节点管理</template>
                    <el-menu-item index="/rbac/node/create">创建</el-menu-item>
                    <el-menu-item index="/rbac/node/list">列表</el-menu-item>
                </el-submenu>
             </el-submenu>
              <el-menu-item index="/history">
                <i class="el-icon-message"></i>
                <span slot="title">历史记录</span>
            </el-menu-item>
            <li class="el-menu-item ddp-close" v-if="mobileLayout" @click="logout">
                <i class="el-icon-warning"></i>
                <span>退出</span>
            </li>
        </el-menu>
    </div>
</template>

<script>
    import Scrollbar from 'smooth-scrollbar';
    export default {
        name: 'Sidebar',
        mounted() {
        //    var customScroll = scrollbot('.sidebar');
        Scrollbar.init(this.$el);
        },
        computed: {
            onRoutes() {
                return this.$route.path;
            },
            isSide() {
                return this.$store.state.option.isSide;
            },
            mobileLayout() {
                return this.$store.state.option.mobileLayout;
            }
        },
        methods: {
            logout() {
                this.$logc.cookie.set('ddp_token', '')
                this.$store.dispatch('login/auth/reRoot', false);
                this.$router.push('/login');
            },
            selectMenu() {
                this.$store.commit('option/EDIT_ISSIDE_STATUS', this.mobileLayout);
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '~assets/scss/mixins';
    .sidebar{
        display: block;
        position: absolute;
        width: 251px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
        z-index: 10;
        @include transition(left .2s);
        > ul {
            height:100%;
            /* overflow: auto; */
        }
        &.isSide{
            left: -251px;
            // display: none;
        }
        .ddp-close{
            padding-left:20px;
            color:#ca2e2e;
            background-color:#2E363F;
            i{
                color:#ca2e2e;
            }
        }
    }
</style>
