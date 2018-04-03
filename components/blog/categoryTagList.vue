<template>
    <div class="blog-list">
    <h2 class="ddp-title">{{title}}列表</h2>
     <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="操作">
        <el-button type="danger" size="mini" @click="delAllItem()">多选删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="initData"
      border
      style="width: 100%"
       @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
      <el-table-column
        prop="name"
        :label="title + '名'"
        width="80">
      </el-table-column>
         <el-table-column
        prop="slug"
        label="别名"
        width="80">
      </el-table-column>
       <el-table-column
        label="是否在导航显示"
        width="120" 
        v-if="tag === 'category'">
         <template slot-scope="scope">
                <el-button-group>
                    <el-button :type="scope.row.is_nav === 0 ? 'info' : ''" size="mini" @click="updateState(0, scope.row)">否</el-button>
                    <el-button :type="scope.row.is_nav === 1 ? 'success' : ''" size="mini" @click="updateState(1, scope.row)">是</el-button>
                </el-button-group>
            </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.create_at | toLocalString}}</span>
      </template>
      </el-table-column>
       <el-table-column
        label="最后修改时间"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.update_at || scope.row.create_at | toLocalString}}</span>
      </template>
      </el-table-column>
      
      <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <nuxt-link :to="`/blog/${tag}/edit/${scope.row._id}`" class="el-button el-button--primary el-button--mini">
          <span>编辑</span>
        </nuxt-link>
        <el-button type="danger" size="mini" @click="delItem(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="page.per_page"
      :small="$store.state.option.mobileLayout"
      :layout="`prev, pager, next${!$store.state.option.mobileLayout? ', jumper' : '' }`"
      :total="page.total"
      class="ddp-page">
    </el-pagination>
    </div>
</template>

<script>

export default {
  props: {
    title: String,
    tag: String,
    currentPage: Number,
    perPage: Number
  },
  data() {
    return {currentAttr: []}
  },
  computed: {
    page(){
      return this.$store.state.blog[this.tag].data.pagination
    },
    initData(){
      return this.$store.state.blog[this.tag].data.data
    }
  },
  methods: {
    async updateState(state, item){
        let datas = [];
        datas.push(item);
         const res = await this.$store.dispatch(`blog/${this.tag}/navStatus`, {datas, state});
        if(res.data && res.data.code !== 0){
          return this.handleCurrentChange(this.currentPage)
        }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      return this.$store.dispatch(`blog/${this.tag}/lists`, {
        page: val,
        per_page: this.perPage
      })
    },
     delItem(item) {
      this.$confirm(`当前${this.title}是: ${item.name} 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(async _ => {
          let res = await this.$store.dispatch(`blog/${this.tag}/del`, [item]);
          if(res.data && res.data.code !== 0){
              return this.handleCurrentChange(this.currentPage)
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
      this.$confirm(`选中的${this.title} 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(async _ => {
          const res = await this.$store.dispatch(`blog/${this.tag}/del`, this.currentAttr);
          if(res.data && res.data.code !== 0){
            return this.handleCurrentChange(this.currentPage)
          }
      }).catch(_ => {});
    }
  }
}
</script>