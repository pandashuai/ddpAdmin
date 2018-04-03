<template>
    <div>
        <h2 class="ddp-title"><i class="el-icon-setting"></i> 自述</h2>
        <div class="ms-doc">
            <h3>README.md</h3>
            <article>
                <h1>后台管理系统</h1>
                <h2>前言</h2>
                <p>开发一个属于自己的后台管理系统，加油，技术不是难点，贵在坚持！</p>
                <h2>开发记录</h2>
                <p>2018-03-21</p>
                <p>1、优化博客->整站配置的交互逻辑</p>
                <p>2018-03-14</p>
                <p>1、适配手机屏幕</p>
                <p>2018-03-09</p>
                <p>2、优化了分类、标签、文章创建模块</p>
                <p>1、添加了历史操作模块</p>
                <p>2018-03-07</p>
                <p>1、完善rbac逻辑功能</p>
                <p>2018-03-02</p>
                <p>1、引入rbac模块</p>
                <p>2018-03-01</p>
                <p>1、后台基本开发完成</p>
                <p>2018-01-23</p>
                <p>3、博客-文章编辑逻辑 (/blog/article/create)</p>
                <p>2、博客-文章列表UI及逻辑 (/blog/article/create)</p>
                <p>1、博客-文章创建逻辑 (/blog/article/create)</p>
                <p>2018-01-22</p>
                <p>2、博客-文章创建UI界面 (/blog/article/create)</p>
                <p>1、实现七牛资源平台UI界面及逻辑处理 (/qiniu)</p>
                <p>2018-01-15</p>
                <p>4、博客-实现公告，标签，分类模块 删除逻辑</p>
                <p>3、博客-实现公告管理 - 编辑展示逻辑及更新逻辑</p>
                <p>2、博客-公告管理模块 - 列表 (/blog/announcement/list)</p>
                <p>1、博客-公告管理模块 - 创建 (/blog/announcement/create)</p>
                <p>2018-01-11</p>
                <p>6、博客-实现标签管理 - 编辑展示逻辑及更新逻辑 (/blog/tag/edit/_id)</p>
                <p>5、博客-标签管理模块 - 列表 (/blog/tag/list)</p>
                <p>4、博客-标签管理模块 - 创建 (/blog/tag/create)</p>
                <p>3、博客 - 整站配置完成(/blog/option)</p>
                <p>2、博客-实现分类管理 - 编辑更新逻辑</p>
                <p>1、扩展侧边导航展示逻辑之前只有一级目录,现在支持多级目录展示</p>
                <p>2018-01-10</p>
                <p>4、博客-实现分类管理 - 编辑展示逻辑 (/blog/category/edit/_id)</p>
                <p>3、博客-分类管理模块 - 列表 (/blog/category/list)</p>
                <p>2、博客-分类管理模块 - 创建 (/blog/category/create)</p>
                <p>1、创建博客 - 分类管理模块</p>
                <p>2018-01-09</p>
                <p>2、引入前台font字体样式，并创建图标展示(/blog/ico)</p>
                <p>1、创建博客管理模块</p>
            </article>
        </div>

    </div>
</template>

<script>
export default {
    data: function(){
        return {}
    }
}
</script>

<style scoped>
    .ms-doc{
        width:100%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>