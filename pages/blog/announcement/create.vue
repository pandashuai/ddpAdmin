<template>
  <div class="bolg_create">
      <h2 class="ddp-title">创建公告</h2>
      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="公告内容">
        <el-input type="textarea" v-model="form.content" :rows="5"></el-input>
      </el-form-item>
      <el-form-item >
          <el-checkbox v-model="form.state" label="是否发布" border :checked="!!form.state" :true-label="trueval" :false-label="falseval"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trueval: 1,
      falseval: 0,
      form: {
          content: '',
          state: 1
      }
    };
  },
  methods: {
    async onSubmit(formName) {
      this.form.content = this.$logc.noSpace(this.form.content);
      if(!this.form.content){
        return this.$notify.error({
          title: '错误',
          message: `公告内容不允许为空!`
        });
      }
      let res = await this.$store.dispatch('blog/announcement/create', this.form);
        if(res.data && res.data.code !== 0){
          this.$refs[formName].resetFields();
        }
    }
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
