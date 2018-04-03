<template>
  <div class="blog-option">
      <h2 class="ddp-title">创建角色</h2>
      <el-form ref="form"  label-width="80px">
      <el-form-item label="角色名">
        <el-input v-model="form.name" placeholder="角色名"></el-input>
      </el-form-item>
        <el-form-item label="所属权限">
          <el-button type="primary" @click="selectNodeVisible = true">选择</el-button>
       </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description" :rows="5" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-radio-group v-model="form.state" fill="#f56c6c">
          <el-radio-button :label="0" >不启用</el-radio-button>
          <el-radio-button :label="1" >启用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createRole">立即创建</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择权限规则"
      :visible.sync="selectNodeVisible"
      :width="$store.state.option.mobileLayout?'95%':'60%'">
      <el-form ref="form" :inline="true" label-width="80px">
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
  </div>
</template>
<script>
const defaultRole = {
    name: '',
    node: [],
    description: '',
    state: 1
}
export default {
  name: 'RoleCreate',
  async fetch({ store }) {
    await store.dispatch('rbac/node/lists', { page: 1, per_page: 1000 });
  },
  data() {
      return {
          selectNodeVisible: false,
          form: JSON.parse(JSON.stringify(defaultRole))
      }
  },
  computed: {
    nodes() {
      let nodes = this.$store.state.rbac.node.data.data;
      return this.formatNode(nodes);
    }
  },
  methods: {// 格式化权限显示结构
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
      async createRole() {
          if(!this.$logc.noSpace(this.form.name)){
              return this.$notify.error({
                title: '错误',
                message: `[角色名]不允许为空!`
            });
          }
          let res = await this.$store.dispatch('rbac/role/create', this.form)
          if(res.data && res.data.code !== 0){
              this.form = JSON.parse(JSON.stringify(defaultRole));
          }
      },
    // 判断该权限是否存在
    isNode(item) {
      for (let i = 0; i < this.form.node.length; i++) {
        const node = this.form.node[i];
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
        this.form.node.splice(index, 1);
      } else {
        this.form.node.push(item);
      }
    }
  }
}
</script>

