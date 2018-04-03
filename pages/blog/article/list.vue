<template>
  <div class="article">
      <h2 class="ddp-title">文章列表</h2>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="分类">
            <el-select v-model="pageParam.category_slug" placeholder="请选择">
                <el-option label="全部" :value="null"></el-option>
                <el-option :label="itme.name" :value="itme.slug" v-for="itme in categoryData" :key="itme.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标签">
            <el-select v-model="pageParam.tag_slug" placeholder="请选择">
                <el-option label="全部" :value="null"></el-option>
                <el-option :label="itme.name" :value="itme.slug" v-for="itme in tagData" :key="itme.name"></el-option>
            </el-select>
        </el-form-item>
          <el-form-item label="发布状态">
            <el-select v-model="pageParam.state" placeholder="请选择">
                <el-option label="全部" :value="null"></el-option>
                <el-option label="回收站" :value="-1"></el-option>
                <el-option label="草稿" :value="0"></el-option>
                <el-option label="已发布" :value="1"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="按热度排序">
            <el-select v-model="pageParam.hot" placeholder="请选择">
                <el-option label="升序" :value="true"></el-option>
                <el-option label="降序" :value="false"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="pageParam.date"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="搜索">
            <el-input v-model="pageParam.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button type="danger"  @click="delAllItem()">多选删除</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="articleData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        type="index"
        label="序号"
        width="50"
        header-align="center">
        </el-table-column>
         <el-table-column
        label="缩略图"
        header-align="center"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
            <img :src="scope.row.thumb" :alt="scope.row.thumb" class="ddp-w60" @click="onImgBd">
        </template>
        </el-table-column>
            <el-table-column
            prop="title"
            label="标题"
            header-align="center"
            :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
            prop="description"
            label="描述"
            header-align="center"
            :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
            label="所属分类"
            header-align="center"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.category" :key="index">{{item.name}}{{index != scope.row.category.length - 1 ? ',': ''}}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="所属标签"
            header-align="center"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.tag" :key="index">{{item.name}}{{index != scope.row.tag.length - 1 ? ',': ''}}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="发布状态"
            width="90"
            header-align="center">
            <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.state === -1" close-transition>回收站</el-tag>
            <el-tag type="warning" v-else-if="scope.row.state === 0" close-transition>草稿</el-tag>
            <el-tag type="success" v-else-if="scope.row.state === 1" close-transition>已发布</el-tag>
        </template>
        </el-table-column>
        <el-table-column
            label="浏览数/点赞数/评论数"
            header-align="center"
            :show-overflow-tooltip="true"
            width="80">
            <template slot-scope="scope">
                <span>{{scope.row.meta.views}}/{{scope.row.meta.likes}}/{{scope.row.meta.comments}}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="创建时间"
            prop="create_at"
            width="180"
            sortable
            header-align="center">
            <template slot-scope="scope">
            <span>{{ scope.row.create_at | toLocalString}}</span>
        </template>
        </el-table-column>
        <el-table-column
            label="最后修改时间"
            width="180"
            header-align="center">
            <template slot-scope="scope">
            <span>{{ scope.row.update_at || scope.row.create_at | toLocalString}}</span>
        </template>
        </el-table-column>
            <el-table-column
        fixed="right"
        label="操作"
        width="150"
        header-align="center">
        <template slot-scope="scope">
            <nuxt-link :to="`/blog/article/edit/${scope.row._id}`" class="el-button el-button--primary el-button--mini">
            <span>编辑</span>
            </nuxt-link>
            <el-button type="danger" size="mini" @click="delItem(scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageParam.page"
      :page-size="pageParam.per_page"
      :small="$store.state.option.mobileLayout"
      :layout="`prev, pager, next${!$store.state.option.mobileLayout? ', jumper' : '' }`"
      :total="page.total"
      class="ddp-page">
    </el-pagination>
  </div>
</template>
<script>
const pageParam = {
    // 当前分布数
    page: 1,
    // 分页数目
    per_page: 5,
    // 发布状态
    state: null,
    // 关键字
    keyword: '',
    // 分类
    category: null,
    // 分类别名
    category_slug: null,
    // 标签
    tag: null,
    // 标签别名
    tag_slug: null,
    // 时间
    date: null,
    // 热度
    hot: true
};
export default {
  name: 'blogArticleList',
  async fetch({store}) {
      await store.dispatch('blog/article/lists', pageParam);
      await store.dispatch('blog/category/lists');
      await store.dispatch('blog/tag/lists');
  },

  data() {
      return {
          currentAttr: [],
          pageParam: JSON.parse(JSON.stringify(pageParam))
      }
  },
  computed: {
      page(){
        return this.$store.state.blog.article.data.pagination
        },
      articleData() {
          return this.$store.state.blog.article.data.data
      },
      categoryData() {
          return this.$store.state.blog.category.data.data
      },
      tagData() {
          return this.$store.state.blog.tag.data.data
      }
  },
  methods: {
      onSearch() {
          return this.handleCurrentChange(1)
      },
      // 获取当前页的数据
      handleCurrentChange(val) {
            if(val){ this.pageParam.page = val; }
            return this.$store.dispatch('blog/article/lists', this.pageParam)
        },
      delItem(item) {
          this.$confirm(`当前文章 确定删除?`, {
            title: '警告',
            type: 'warning',
            center: true,
            confirmButtonClass: 'el-button--danger'
        }).then(async _ => {
            let res = await this.$store.dispatch('blog/article/del', [item]);
            if(res.data && res.data.code !== 0){
                return this.handleCurrentChange()
            }
        }).catch(_ => {});
      },
    // 多选的状态值
    handleSelectionChange(val) {
      this.currentAttr = val;
    },
      // 删除多个列表的数据
    delAllItem() {
      if(this.currentAttr.length <= 0){
         return this.$notify({
          type: 'warning',
          title: '警告',
          message: `没有选中列表的值!`
        });
      }
      this.$confirm(`选中的公告 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(async _ => {
          let res = await this.$store.dispatch('blog/article/del',this.currentAttr);
          if(res.data && res.data.code !== 0){
            return this.handleCurrentChange()
          }
      }).catch(_ => {});
    }
  }
}
</script>

