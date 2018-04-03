<template>
  <div class="blog-option">
      <h2 class="ddp-title">{{title}}</h2>
      <el-form ref="form"  label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.user" placeholder="用户名" v-if="type === 1"></el-input>
         <el-tag type="danger" v-else-if="type === 2" close-transition>{{form.user}}</el-tag>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" :placeholder="type === 2 ? '为空就是保持原先的密码！':'密码'"></el-input>
        <!-- <el-button type="danger" v-else-if="type === 2" @click="resetPwd">重置密码</el-button> -->
      </el-form-item>
        <el-form-item label="所属角色">
          <el-tag
            v-for="role in form.role"
            :key="role.name"
            closable
            @close="handleClose(form.role, role)">
            {{role.name}} 
            </el-tag> 
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary">
              请选择<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  v-for="role in roles" :key="role.name" :command="{arr: form.role, val: role}" :disabled="onDisabled(form.role, role)">{{role.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
       </el-form-item>
       <el-form-item label="头像" :inline="true">
        <el-col :span="10">
          <el-input v-model="form.cover" placeholder="头像链接"></el-input>
        </el-col>
         <el-col :span="1">&nbsp;</el-col>
         <el-col :span="6">
          <el-button type="primary" @click="qiniuBoxVisible = true">选择</el-button>
        </el-col>
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
        <el-button type="primary" @click="createUser" v-if="type === 1">立即创建</el-button>
        <el-button type="danger" @click="updateUser" v-if="type === 2">立即更新</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="qiniuBoxVisible"
      :width="$store.state.option.mobileLayout?'95%':'60%'">
      <qiniu-box></qiniu-box>
    </el-dialog>
  </div>
</template>
<script>
import QiniuBox from '~/components/qiniu.vue';
export default {
  name: 'UserModel',
  data() {
      return {
          qiniuBoxVisible: false,
          form: JSON.parse(JSON.stringify(this.$store.state.rbac.user.current))
      }
  },
  props: {
      title: String,
      type: Number
  },
 async mounted() {
  //  console.log(1);
    await this.$store.dispatch('rbac/role/lists', {page: 1, per_page: 1000});
  },
  computed: {
    roles(){
      return this.$store.state.rbac.role.data.data
    }
  },
  components: {
    QiniuBox
  },
  methods: {
      async updateUser() {
          if(!this.form._id){
            return this.$notify.error({
            title: '错误',
            message: `不能编辑，该用户已不存在!`
            });
        }
        if(!this.form.cover){
        return this.$notify.error({
          title: '错误',
          message: `头像不允许为空!`
        });
      }
       this.form.update_at && delete this.form.update_at
       await this.$store.dispatch('rbac/user/edit', this.form);
      },
      async createUser() {
          if(!this.$logc.noSpace(this.form.user) || !this.$logc.noSpace(this.form.password) || !this.$logc.noSpace(this.form.cover)){
              return this.$notify.error({
                title: '错误',
                message: `[用户名|密码|头像]不允许为空!`
            });
          }
          let res = await this.$store.dispatch('rbac/user/create', this.form)
          if(res.data && res.data.code !== 0){
              this.form = JSON.parse(JSON.stringify(this.$store.state.rbac.user.current));
          }
      },
      handleCommand(data) {
      if(data.arr.indexOf(data.val) == '-1'){
        data.arr.push(data.val)
      }
    },
    handleClose(arr, item) {
      return arr.splice(arr.indexOf(item), 1);
    },
    onDisabled(arr, itme) {
      return arr.indexOf(itme) != '-1'
    }
  }
}
</script>
