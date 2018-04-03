<template>
    <div>
    <h2 class="ddp-title">用户列表</h2>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="发布状态">
        <el-select placeholder="请选择"  v-model="form.state" clearable>
          <el-option label="不启用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="搜索">
            <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="danger"  @click="delAllItem()">多选删除</el-button>
        </el-form-item>
    </el-form>
    <el-table
      :data="userData"
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
        label="头像"
        header-align="center"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
            <img :src="scope.row.cover" :alt="scope.row.cover" class="ddp-w60" @click="onImgBd">
        </template>
        </el-table-column>
    <el-table-column
        prop="user"
        label="用户名"
        header-align="center"
        :show-overflow-tooltip="true">
      </el-table-column>
        <el-table-column
        label="状态"
        width="85"
        header-align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state == 1" close-transition>启用</el-tag>
          <el-tag type="danger" v-if="scope.row.state == 0" close-transition>不启用</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        label="所属角色"
        width="150"
        header-align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.user === 'admin'" close-transition>超级管理员</el-tag>
          <el-tag type="danger" v-else-if="scope.row.role.length <= 0" close-transition>未定义</el-tag>
          <el-tag type="success" v-else close-transition v-for="role in scope.row.role" :key="role.name">{{role.name}}</el-tag> 
      </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        header-align="center"
        :show-overflow-tooltip="true">
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
        <nuxt-link :to="`/rbac/user/edit/${scope.row._id}`" class="el-button el-button--primary el-button--mini">
            <span>编辑</span>
         </nuxt-link>
        <el-button type="danger" size="mini" @click="delItem(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="form.page"
      :page-size="form.per_page"
      :small="$store.state.option.mobileLayout"
      :layout="`prev, pager, next${!$store.state.option.mobileLayout? ', jumper' : '' }`"
      :total="page.total"
      class="ddp-page">
    </el-pagination>
    </div>
</template>

<script>
const pageParam = {
    page: 1,
    per_page: 5,
    state: null,
    Keyword: ''
  };
export default {
  async fetch ({ store }) {
    await store.dispatch('rbac/user/lists', pageParam)
  },
  data() {
    return {
      currentAttr: [],
      form: pageParam
    }
  },
  computed: {
    page(){
      return this.$store.state.rbac.user.data.pagination
    },
    userData(){
      return this.$store.state.rbac.user.data.data
    }
  },
  methods: {
    // 获取当前页的数据
    handleCurrentChange(val) {
        if(val){
            this.form.page = val;
        }
      return this.$store.dispatch('rbac/user/lists', this.form)
    },
    // 删除单个列表的数据
     delItem(item) {
      this.$confirm(`当前用户 [${item.user}] 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(async _ => {
          let res = await this.$store.dispatch('rbac/user/del', [item])
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
      this.$confirm(`选中的用户 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(async _ => {
          let res = await this.$store.dispatch('rbac/user/del', this.currentAttr)
          if(res.data && res.data.code !== 0){
            return this.handleCurrentChange(this.currentPage)
          }
      }).catch(_ => {});
    }
  }
}
</script>
