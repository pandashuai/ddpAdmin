<template>
  <div class="bolg_create">
      <el-button type="primary" icon="el-icon-picture-outline" style="float:right" size="mini" @click="icoVisible = true"></el-button>
      <h2 class="ddp-title">{{title}}{{label}}</h2>
      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label="label + '名'" >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
        <el-form-item label="slug">
        <el-input v-model="form.slug"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description" :rows="5"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(extend, index) in form.extends"
        :label="'扩展' + index"
        :key="index"
        class="ddp-extendname"
      >
      <el-input placeholder="名字" v-model="extend.name">
        <template slot="prepend">名字</template>
      </el-input>
       <el-input placeholder="值" v-model="extend.value">
        <template slot="prepend">值</template>
      </el-input>
      <el-button @click.prevent="removeExtend(extend)" type="danger">删除</el-button>
      <el-button @click.prevent="addExtend()" type="primary" v-if="(form.extends.length - 1) == index">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" v-if="type === 1">立即创建</el-button>
        <el-button type="primary" @click="onUpdate('form')" v-if="type === 2">立即更新</el-button>
        <el-button type="info" @click="addExtend()" v-if="form.extends.length == 0">创建扩展</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="icoVisible"
      :width="$store.state.option.mobileLayout?'95%':'60%'"
      append-to-body>
      <ico-box></ico-box>
    </el-dialog>
  </div>
</template>

<script>
import IcoBox from '~/components/blog/ico.vue'
export default {
  data() {
    return {
      icoVisible: false,
      form: JSON.parse(JSON.stringify(this.$store.state.blog[this.tag].current))
    };
  },
  props: {
    type: Number,
    title: String,
    tag: String,
    label: String,
    reload: Boolean
  },
  methods: {
    async onSubmit(formName) {
      if(!this.form.name || !this.form.slug){
        return this.$notify.error({
          title: '错误',
          message: `${this.label}名或slug不允许为空!`
        });
      }
      const res = await this.$store.dispatch(`blog/${this.tag}/create`, this.form);
      if(res.data && res.data.code !== 0){
        this.form = JSON.parse(JSON.stringify(this.$store.state.blog[this.tag].current));
        if(this.reload){
          await this.$store.dispatch(`blog/${this.tag}/lists`);
        }
      }
    },
    async onUpdate(formName) {
      if(!this.form._id){
         return this.$notify.error({
          title: '错误',
          message: `不能编辑，该${this.label}已不存在!`
        });
      }
      if(!this.form.name || !this.form.slug){
        return this.$notify.error({
          title: '错误',
          message: `${this.label}名或slug不允许为空!`
        });
      }
      this.form.update_at && delete this.form.update_at
      const res = await this.$store.dispatch(`blog/${this.tag}/edit`, this.form);
    },
    removeExtend(item) {
      var index = this.form.extends.indexOf(item);
      if (index !== -1) {
        this.form.extends.splice(index, 1);
      }
    },
    addExtend() {
      this.form.extends.push({
        value: '',
        name: ''
      });
    }
  },
  components: {
    IcoBox
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.bolg_create {
  .el-textarea,
  .el-input {
    margin-right: 10px;
    // width: 300px;
    vertical-align: top;
  }
}
</style>
