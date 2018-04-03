<template>
    <div>
    <h2 class="ddp-title">角色列表</h2>
    <el-form :inline="true">
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
      :data="roleData"
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
        prop="name"
        label="角色名"
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
        label="所属权限"
        width="150"
        header-align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editItem(scope.row, 'infoNodeVisible')">查看</el-button>
          <el-button type="danger" size="mini" @click="editItem(scope.row, 'editNodeVisible')">配置</el-button>
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
        <el-button type="primary" size="mini" @click="editItem(scope.row, 'editNoteVisible')">编辑</el-button>
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
    <el-dialog
      title="编辑权限规则"
      :visible.sync="editNodeVisible"
      :width="$store.state.option.mobileLayout?'95%':'60%'">
      <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item>
        <el-button type="danger" @click="updateRole">立即更新</el-button>
      </el-form-item>
      <div v-for="node in nodes" :key="node.classname">
      <h2 class="ddp-title">{{node.classname}}</h2>
      <el-form-item>
        <el-tooltip effect="dark" :content="`${item.method}:${item.route}`" placement="top" v-for="item in node.arrs" :key="item.name">
             <el-button :type="isNode(item) != '-1'? 'primary':''"  size="mini" @click='editNodeStatus(item)'>{{item.name}}</el-button>
      </el-tooltip>
      </el-form-item>
        </div>
      </el-form>
    </el-dialog>
     <el-dialog
      title="编辑"
      :visible.sync="editNoteVisible"
      :width="$store.state.option.mobileLayout?'95%':'40%'">
      <el-form ref="form"  label-width="80px">
        <el-form-item label="描述">
        <el-input type="textarea" v-model="editObj.description" :rows="5" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-radio-group v-model="editObj.state" fill="#f56c6c">
          <el-radio-button :label="0" >不启用</el-radio-button>
          <el-radio-button :label="1" >启用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="updateRole">立即更新</el-button>
      </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="查看权限规则"
      :visible.sync="infoNodeVisible"
      :width="$store.state.option.mobileLayout?'95%':'60%'">
      <el-form ref="form" :inline="true" label-width="80px">
      <div v-for="node in formatNode(editObj.node)" :key="node.classname">
      <h2 class="ddp-title">{{node.classname}}</h2>
      <el-form-item>
        <el-tooltip effect="dark" :content="`${item.method}:${item.route}`" placement="top" v-for="item in node.arrs" :key="item.name">
             <el-button type="primary" size="mini">{{item.name}}</el-button>
      </el-tooltip>
      </el-form-item>
        </div>
      </el-form>
    </el-dialog>

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
  name: 'RoleList',
  async fetch({ store }) {
    await store.dispatch('rbac/role/lists', pageParam);
    await store.dispatch('rbac/node/lists', { page: 1, per_page: 1000 });
  },
  data() {
    return {
      infoNodeVisible: false,
      editNoteVisible: false,
      editNodeVisible: false,
      editObj: { node: [] },
      currentAttr: [],
      form: pageParam
    };
  },
  computed: {
    nodes() {
      let nodes = this.$store.state.rbac.node.data.data;
      return this.formatNode(nodes);
    },
    page() {
      return this.$store.state.rbac.role.data.pagination;
    },
    roleData() {
      return this.$store.state.rbac.role.data.data;
    }
  },
  methods: {
    // 格式化权限显示结构
    formatNode(datas){
       let data = {};
        datas.map(val => {
          if (!data[val.classname]) {
            data[val.classname] = [];
          }
          data[val.classname].push(val);
        });
        let nodes = [];
        for (let key in data) {
          nodes.push({
            classname: key,
            arrs: data[key]
          });
        }
      return nodes
    },
    // 判断该权限是否存在
    isNode(item) {
      for (let i = 0; i < this.editObj.node.length; i++) {
        const node = this.editObj.node[i];
        if ((node._id || node) === (item._id || item)) {
          return i;
        }
      }
      return '-1';
    },
    // 编辑所属权限状态
    editNodeStatus(item) {
      const index = this.isNode(item);
      if (index != '-1') {
        this.editObj.node.splice(index, 1);
      } else {
        this.editObj.node.push(item);
      }
    },
    // 更新权限
    async updateRole() {
      let res = await this.$store.dispatch('rbac/role/edit', this.editObj);
      if (res.data && res.data.code === 1) {
        return this.handleCurrentChange();
      }
    },
    // 打开对应的弹框
    editItem(item, type) {
      this.editObj = JSON.parse(JSON.stringify(item));
      this[type] = true;
    },
    // 获取当前页的数据
    handleCurrentChange(val) {
      if (val) {
        this.form.page = val;
      }
      return this.$store.dispatch('rbac/role/lists', this.form);
    },
    // 删除单个列表的数据
    delItem(item) {
      this.$confirm(`当前角色 [${item.name}] 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      })
        .then(async _ => {
          let res = await this.$store.dispatch('rbac/role/del', [item]);
          if (res.data && res.data.code !== 0) {
            return this.handleCurrentChange();
          }
        })
        .catch(_ => {});
    },
    // 多选的状态值
    handleSelectionChange(val) {
      this.currentAttr = val;
    },
    // 删除多个列表的数据
    delAllItem() {
      if (this.currentAttr.length <= 0) {
        return this.$notify({
          type: 'warning',
          title: '警告',
          message: `没有选中列表的值!`
        });
      }
      this.$confirm(`选中的角色 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      })
        .then(async _ => {
          let res = await this.$store.dispatch(
            'rbac/role/del',
            this.currentAttr
          );
          if (res.data && res.data.code !== 0) {
            return this.handleCurrentChange(this.currentPage);
          }
        })
        .catch(_ => {});
    }
  }
};
</script>
