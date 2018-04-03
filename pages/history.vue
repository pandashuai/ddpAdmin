<template>
    <div>
    <h2 class="ddp-title">历史记录操作列表</h2>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="操作">
        <el-button type="danger" size="mini" @click="delAllItem()">清空历史</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="historyData"
      border
      style="width: 100%"
     >
      <el-table-column
      type="index"
      label="序号"
      width="50"
      header-align="center">
    </el-table-column>
       <el-table-column
        prop="user"
        label="所属用户"
        header-align="center"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="description"
        label="操作记录"
        header-align="center"
        :show-overflow-tooltip="true"
        width="250">
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
        label="最后修改时间"
        width="180"
        header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.update_at || scope.row.create_at | toLocalString}}</span>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :small="$store.state.option.mobileLayout"
      :layout="`prev, pager, next${!$store.state.option.mobileLayout? ', jumper' : '' }`"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="page.per_page"
      :total="page.total"
      class="ddp-page">
    </el-pagination>

    
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
    return store.dispatch('history/lists', {
      page: pageParam.currentPage,
      per_page: pageParam.perPage,
      state: pageParam.state
    })
  },
  data() {
    return {
      // 当前多少页
      currentPage: pageParam.currentPage,
      // 要显示多少页
      perPage: pageParam.perPage
    }
  },
  computed: {
    page(){
      return this.$store.state.history.data.pagination
    },
    historyData(){
      return this.$store.state.history.data.data
    }
  },
  methods: {
    // 获取当前页的数据
    handleCurrentChange(val) {
        if(val){
            this.currentPage = val;
        }
      return this.$store.dispatch('history/lists', {
        page: val,
        per_page: this.perPage,
        state: this.state
      })
    },
    // 清空数据
    delAllItem() {
      this.$confirm(`[历史记录]确定清空?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(async _ => {
          let res = await this.$store.dispatch('history/del', {});
          if(res.data && res.data.code !== 0){
            return this.handleCurrentChange(1)
          }
      }).catch(_ => {});
    }
  }
}
</script>
