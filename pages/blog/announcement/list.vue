<template>
    <div>
    <h2 class="ddp-title">公告列表</h2>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="筛选">
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select placeholder="请选择"  v-model="state" clearable @change="changeState">
          <el-option label="已发布" :value="trueval"></el-option>
          <el-option label="没发布" :value="falseval"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作">
        <el-button type="danger" size="mini" @click="delAllItem()">多选删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="announcementData"
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
        label="发布状态"
        width="80"
        header-align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state == 1" close-transition>已发布</el-tag>
          <el-tag type="danger" v-if="scope.row.state == 0" close-transition>没发布</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="公告内容"
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
        <el-button type="primary" size="mini" @click="editItem(scope.row)">编辑</el-button>
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

    <el-dialog
      title="编辑公告"
      :width="$store.state.option.mobileLayout? '90%':'30%'"
      :visible.sync="currentVisible">
      <el-form ref="form" :model="currentData" :rules="rules" label-width="80px">
      <el-form-item label="公告内容" prop="content">
        <el-input type="textarea" v-model="currentData.content" :rows="5"></el-input>
      </el-form-item>
      <el-form-item >
          <el-checkbox v-model="currentData.state" label="是否发布" border :checked="!!currentData.state" :true-label="trueval" :false-label="falseval"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate('form')">立即更新</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
    </div>
</template>

<script>
const pageParam = {
    currentPage: 1,
    perPage: 5,
    state: null
  };
export default {
  fetch ({ store }) {
    return store.dispatch('blog/announcement/lists', {
      page: pageParam.currentPage,
      per_page: pageParam.perPage,
      state: pageParam.state
    })
  },
  data() {
    return {
      // 发布状态
      state: pageParam.state,
      // 发布状态为真
      trueval: 1,
      // 发布状态为假
      falseval: 0,
      // 当前选中的item的数组
      currentAttr: [],
      // 当前选中的item
      currentData: {},
      // 编辑对话框的显示状态
      currentVisible: false,
      // 当前多少页
      currentPage: pageParam.currentPage,
      // 要显示多少页
      perPage: pageParam.perPage,
      // 内容的规则
      rules: {
        content: [{ required: true, message: 'ddp: 不允许为空！', trigger: 'blur' }]
      }
    }
  },
  computed: {
    page(){
      return this.$store.state.blog.announcement.data.pagination
    },
    announcementData(){
      return this.$store.state.blog.announcement.data.data
    }
  },
  methods: {
    // 筛选发布状态
    changeState(state) {
     return this.handleCurrentChange(1)
    },
    // 获取当前页的数据
    handleCurrentChange(val) {
      this.currentPage = val;
      return this.$store.dispatch('blog/announcement/lists', {
        page: val,
        per_page: this.perPage,
        state: this.state
      })
    },
    // 编辑列表的数据
    editItem(item) {
      this.currentData = JSON.parse(JSON.stringify(item));
      this.currentVisible = true;
    },
    // 删除单个列表的数据
     delItem(item) {
      this.$confirm(`当前公告 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(async _ => {
          let res = await this.$store.dispatch('blog/announcement/del', [item])
          if(res.data && res.data.code !== 0){
              return this.handleCurrentChange(this.currentPage)
          }
      }).catch(_ => {});
    },
    // 更新列表的数据
    async onUpdate(formName) {
      if(!this.currentData._id){
         return this.$notify.error({
          title: '错误',
          message: `不能编辑，该公告内容已不存在!`
        });
      }
      this.currentData.content = this.currentData.content.replace(/(^\s+|\s+$)/g, '');
      if(!this.currentData.content){
        return this.$notify.error({
          title: '错误',
          message: `公告内容不允许为空!`
        });
      }
      this.currentData.update_at && delete this.currentData.update_at
      let res = await this.$store.dispatch('blog/announcement/edit', this.currentData)
       if(res.data && res.data.code !== 0){
        return this.handleCurrentChange(this.currentPage)
      }
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
          let res = await this.$store.dispatch('blog/announcement/del', this.currentAttr);
          if(res.data && res.data.code !== 0){
            return this.handleCurrentChange(this.currentPage)
          }
      }).catch(_ => {});
    }
  }
}
</script>
