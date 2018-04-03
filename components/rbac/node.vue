<template>
  <div class="blog-option">
      <h2 class="ddp-title">{{title}}</h2>
      <el-form ref="form"  label-width="80px">
      <el-form-item label="节点名">
        <el-input v-model="form.name" placeholder="节点名"></el-input>
      </el-form-item>
        <el-form-item label="路由">
          <el-input v-model="form.route" placeholder="路由"></el-input>
       </el-form-item>
       <el-form-item label="所属分类">
         <div class="el-form--inline">
           <el-form-item> <el-input v-model="form.classname" placeholder="所属分类"></el-input></el-form-item>
           <el-form-item>
            <el-select placeholder="请选择已知分类"  v-model="form.classname" clearable filterable >
             <el-option :label="item" :value="item" v-for="item in nodeClass" :key="item"></el-option>
            </el-select>
            </el-form-item>
         </div>
       </el-form-item>
       <el-form-item label="请求方法">
        <el-select placeholder="请选择"  v-model="form.method" clearable>
          <el-option label="GET" value="GET"></el-option>
          <el-option label="POST" value="POST"></el-option>
          <el-option label="PUT" value="PUT"></el-option>
          <el-option label="DELETE" value="DELETE"></el-option>
          <el-option label="TRACE" value="TRACE"></el-option>
        </el-select>
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
        <el-button type="primary" @click="createNode" v-if="type === 1">立即创建</el-button>
        <el-button type="primary" @click="updateNode" v-if="type === 2">立即更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'NodeCreate',
  data() {
      return {
          form: JSON.parse(JSON.stringify(this.$store.state.rbac.node.current))
      }
  },
  props: {
      title: String,
      type: Number
  },
  async mounted () {
     await this.$store.dispatch('rbac/node/nodeclass')
  },
  computed: {
    nodeClass() {
      return this.$store.state.rbac.node.node_class
    }
  },
  methods: {
      async updateNode() {
        if(!this.$logc.noSpace(this.form.name) || !this.$logc.noSpace(this.form.classname) || !this.$logc.noSpace(this.form.route) || !this.$logc.noSpace(this.form.method)){
              return this.$notify.error({
                title: '错误',
                message: `[权限名|所属分类|权限路由|方法名]不允许为空!`
            });
          }
       this.form.update_at && delete this.form.update_at
       await this.$store.dispatch('rbac/node/edit', this.form);
      },
      async createNode() {
          if(!this.$logc.noSpace(this.form.name) || !this.$logc.noSpace(this.form.classname) || !this.$logc.noSpace(this.form.route) || !this.$logc.noSpace(this.form.method)){
              return this.$notify.error({
                title: '错误',
                message: `[权限名|所属分类|权限路由|方法名]不允许为空!`
            });
          }
          let res = await this.$store.dispatch('rbac/node/create', this.form)
          if(res.data && res.data.code !== 0){
              this.$store.dispatch('rbac/node/reItemList');
              this.form = JSON.parse(JSON.stringify(this.$store.state.rbac.node.current));
              await this.$store.dispatch('rbac/node/nodeclass');
          }
      }
  }
}
</script>

