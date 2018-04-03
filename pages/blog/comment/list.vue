<template>
  <div class="comment">
      <h2 class="ddp-title">评论列表</h2>
      <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="发布状态">
            <el-select v-model="pageParam.state" placeholder="请选择">
                <el-option label="全部" :value="null"></el-option>
                <el-option label="待审核" :value="0"></el-option>
                <el-option label="通过正常" :value="1"></el-option>
                <el-option label="已删除" :value="-1"></el-option>
                <el-option label="垃圾评论" :value="-2"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="排序">
            <el-select v-model="pageParam.sort" placeholder="请选择">
                <el-option label="按字段升序" :value="-1"></el-option>
                <el-option label="按字段降序" :value="1"></el-option>
                <el-option label="按点赞数升序" :value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="搜索">
            <el-input v-model="pageParam.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button :type="currentAttr.length > 0 ? 'danger':''"  @click="delAllItem()">多选删除</el-button>
        </el-form-item>
      </el-form>
       <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="修改状态">
            <el-button-group>
                    <el-button :type="currentAttr.length > 0 ? 'info':''" size="mini" @click="updateState(0)">待审核</el-button>
                    <el-button :type="currentAttr.length > 0 ? 'success':''" size="mini" @click="updateState(1)">通过正常</el-button>
                    <el-button :type="currentAttr.length > 0 ? 'danger':''" size="mini" @click="updateState(-1)">已删除</el-button>
                    <el-button :type="currentAttr.length > 0 ? 'warning':''" size="mini" @click="updateState(-2)">垃圾评论</el-button>
                </el-button-group>
        </el-form-item>
      </el-form>
      <el-table
        :data="commentData"
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
            label="是否置顶"
            width="60"
            header-align="center">
            <template slot-scope="scope">
                <el-button size="mini" :type="scope.row.is_top ? 'success':''">{{scope.row.is_top ? '是':'否'}}</el-button>
            </template>
        </el-table-column>
        <el-table-column
            prop="author.name"
            label="名称"
            header-align="center"
            :show-overflow-tooltip="true">
        </el-table-column>
        
        <el-table-column
            prop="content"
            label="内容"
            header-align="center"
            :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
            label="发布状态"
            width="315"
            header-align="center">
            <template slot-scope="scope">
                <el-button-group>
                    <el-button :type="scope.row.state === 0 ? 'info' : ''" size="mini" @click="updateState(0, scope.row)">待审核</el-button>
                    <el-button :type="scope.row.state === 1 ? 'success' : ''" size="mini" @click="updateState(1, scope.row)">通过正常</el-button>
                    <el-button :type="scope.row.state === -1 ? 'danger' : ''" size="mini" @click="updateState(-1, scope.row)">已删除</el-button>
                    <el-button :type="scope.row.state === -2 ? 'warning' : ''" size="mini" @click="updateState(-2, scope.row)">垃圾评论</el-button>
                </el-button-group>
            </template>
        </el-table-column>
        <el-table-column
            prop="likes"
            label="被赞数"
            header-align="center"
            :show-overflow-tooltip="true">
        </el-table-column>
         <el-table-column
            prop="author.email"
            label="邮箱"
            header-align="center"
            :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
            label="IP地址"
            header-align="center"
            :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.ip === '::1' ? '127.0.0.1' : scope.row.ip}}</span>
            </template>
        </el-table-column>
          <el-table-column
            label="IP物理地址"
            header-align="center"
            :show-overflow-tooltip="true">
             <template slot-scope="scope">
                <span>{{ scope.row.ip_location ? JSON.stringify(scope.row.ip_location) : '是本地或未查到'}}</span>
            </template>
        </el-table-column>
         <el-table-column
            prop="author.site"
            label="site"
            header-align="center"
            :show-overflow-tooltip="true">
        </el-table-column>
         <el-table-column
            label="用户UA"
            header-align="center"
            :show-overflow-tooltip="true">
             <template slot-scope="scope">
                <span>{{ scope.row.agent || '不清楚'}}</span>
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
        header-align="center"
       align="center">
        <template slot-scope="scope">
            <a :href="`${$logc.blogUrl}/article/${scope.row.post_id}`" class="el-button el-button--primary el-button--mini" target="_block">查看</a>
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
    // 排序
    sort: -1,
    // 关键字搜索
    keyword: '',
    // 状态
    state: null
};
export default {
  name: 'blogCommentList',
  async fetch({store}) {
      await store.dispatch('blog/comment/lists', pageParam);
  },
  data() {
      return {
          currentAttr: [],
          pageParam: JSON.parse(JSON.stringify(pageParam))
      }
  },
  computed: {
      page(){
        return this.$store.state.blog.comment.data.pagination
        },
      commentData() {
          return this.$store.state.blog.comment.data.data
      }
  },
  methods: {
      // 查询
      onSearch() {
          return this.handleCurrentChange(1)
      },
      async updateState(state, item){
          let datas = [];
          if(item){
            if(state === item.state) return false;
             datas.push(item)
          }else{
              if(this.currentAttr.length <= 0) return false;
              datas = this.currentAttr
          }
          let res = await this.$store.dispatch('blog/comment/status', {datas, state});
          if(res.data && res.data.code !== 0){
            return this.handleCurrentChange()
          }
      },
      // 获取当前页的数据
      handleCurrentChange(val) {
            if(val){ this.pageParam.page = val; }
            return this.$store.dispatch('blog/comment/lists', this.pageParam)
        },
      delItem(item) {
          this.$confirm(`当前评论 确定删除?`, {
            title: '警告',
            type: 'warning',
            center: true,
            confirmButtonClass: 'el-button--danger'
        }).then(async _ => {
            let res = await this.$store.dispatch('blog/comment/del', [item]);
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
         return false;
      }
      this.$confirm(`选中的公告 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(async _ => {
          let res = await this.$store.dispatch('blog/comment/del', this.currentAttr);
          if(res.data && res.data.code !== 0){
            return this.handleCurrentChange()
          }
      }).catch(_ => {});
    }
  }
}
</script>
