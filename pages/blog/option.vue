<template>
  <div class="blog-option">
      <h2 class="ddp-title">整站配置</h2>
      <el-form ref="form"  label-width="80px">
      <el-form-item label="主标题">
        <el-input v-model="form.title" placeholder="主标题"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="form.sub_title" placeholder="副标题"></el-input>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="keywords" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description" :rows="5" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="站点地址">
        <el-input v-model="form.site_url" placeholder="站点地址"></el-input>
      </el-form-item>
      <el-form-item label="站点邮箱">
        <el-input v-model="form.site_email" placeholder="站点邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备案号">
        <el-input v-model="form.site_icp" placeholder="备案号"></el-input>
      </el-form-item>
       <el-form-item label="搜索引擎">
        <el-button type="info" @click="eidtList('pingSites')">编辑</el-button>
      </el-form-item>
      <el-form-item label="黑名单">
        <el-button type="info" @click="eidtList('ips')">ips</el-button>
        <el-button type="info" @click="eidtList('mails')">邮箱</el-button>
        <el-button type="info" @click="eidtList('keywords')">关键字</el-button>
      </el-form-item>
      <el-form-item label="友情链接">
        <el-button type="info" @click="links.addVisible = true;">添加</el-button>
        <el-button type="info" @click="links.editVisible = true;">编辑</el-button>
      </el-form-item>      
      <el-form-item  label="额外数据" class="ddp-extendname">
       <el-input placeholder="被喜欢次数" v-model="form.meta.likes">
            <template slot="prepend">被喜欢次数</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateOption">更新配置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
        :title="edit.title"
        :visible.sync="edit.visible"
        :width="$store.state.option.mobileLayout?'90%':'40%'">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item :label="edit.label">
                <el-input v-model="edit.name" :placeholder="edit.label"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onAdd(edit.data, edit.name)">添加</el-button>
            </el-form-item>
        </el-form>
         <el-table :data="edit.data" height="200">
             <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column :label="edit.label">
                 <template slot-scope="scope">
                    <span>{{ scope.row }}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="delItem(edit.data, scope.row)">删除</el-button>
                    </template>
            </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog
        title="友情链接"
        :visible.sync="links.editVisible"
        :width="$store.state.option.mobileLayout?'90%':'40%'">
         <el-table :data="form.links" height="200">
             <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column label="名称">
                 <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
          <el-table-column label="链接">
                 <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                </template>
            </el-table-column>
           <el-table-column label="描述">
                 <template slot-scope="scope">
                    <span>{{ scope.row.description }}</span>
                </template>
            </el-table-column>                      
            <el-table-column
                fixed="right"
                label="操作"
                width="150">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="delItem(form.links, scope.row)">删除</el-button>
                    </template>
            </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog
        title="友情链接"
        :visible.sync="links.addVisible"
        :width="$store.state.option.mobileLayout?'90%':'40%'">
        <el-form ref="form" :model="links.data" label-width="80px">
          <el-form-item label="名称">
            <el-input type="text" v-model="links.data.name"></el-input>
          </el-form-item>
          <el-form-item label="链接">
            <el-input type="text" v-model="links.data.value"></el-input>
          </el-form-item>                   
          <el-form-item label="描述">
            <el-input type="textarea" v-model="links.data.description" :rows="5"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onAdd(form.links, links.data, 'links')">添加</el-button>
          </el-form-item>
       </el-form>
    </el-dialog>    
  </div>
</template>
<script>
export default {
  name: 'BlogOption',
  fetch ({ store }) {
    return store.dispatch('blog/option/lists')
  },
  data() {
      return {
          links: {
            editVisible: false,
            addVisible: false,
            data: {
              name: '',
              value: '',
              description: ''
            }
          },
          edit: {
              data: [],
              name: '',
              title: '对话框',
              visible: false,
              label: '标签'
          }
      }
  },
  computed: {
      form() {
          return JSON.parse(JSON.stringify(this.$store.state.blog.option.data))
      },
      keywords: {
            get() {
                return this.form.keywords.join(',')
            },
            set(newValue) {
                this.form.keywords = newValue.split(',')
            }
      }
  },
  methods: {
     async updateOption() {
         if(!this.form.title || !this.form.sub_title || !this.form.site_url){
            return this.$message({
                type: 'err',
                message: '[网站标题|网站副标题|site_url] 不允许为空！'
            });
         }
         let res = await this.$store.dispatch('blog/option/edit', this.form)
         if(res.data && res.data.code !== 0){
             return this.$store.dispatch('blog/option/lists')
         }
      },
      delItem(arr, item) {
            var index = arr.indexOf(item);
            if (index !== -1) {
                arr.splice(index, 1);
            }
      },
      eidtList(type) {
          if(type === 'pingSites'){
              this.edit = {
                    data: this.form.ping_sites,
                    name: '',
                    title: '搜索引擎',
                    visible: true,
                    label: '字段'
                }
          }else if(type === 'ips'){
              this.edit = {
                    data: this.form.blacklist.ips,
                    name: '',
                    title: '屏蔽ip',
                    visible: true,
                    label: 'ip'
                }
          }else if(type === 'mails'){
              this.edit = {
                    data: this.form.blacklist.mails,
                    name: '',
                    title: '屏蔽邮箱',
                    visible: true,
                    label: '邮箱'
                }
          }else if(type === 'keywords'){
              this.edit = {
                    data: this.form.blacklist.keywords,
                    name: '',
                    title: '屏蔽关键字',
                    visible: true,
                    label: '关键字'
                }
          }
      },
      onAdd(arr, item, type) {
          if(type === 'links'){
            item.name = this.$logc.noSpace(item.name);
            item.value = this.$logc.noSpace(item.value);
            item.description = this.$logc.noSpace(item.description);
            if(!item.name || !item.value){
              return;
            }
          }else{
           item = this.$logc.noSpace(item);
            if(!item){
                return;
            }
          }
          if(typeof item === 'object'){
              for (let i = 0; i < arr.length; i++) {
                 if(arr[i].name == item.name && arr[i].value == item.value){
                     return this.$message({
                        type: 'info',
                        message: '已经存在！'
                    });
                 }
                  
              }
              arr.push(JSON.parse(JSON.stringify(item)));
              item.name = '';
              item.value = '';
              item.description = '';
          }else{
            if(arr.indexOf(item) != '-1'){
                return this.$message({
                        type: 'info',
                        message: '已经存在！'
                    });
            }
            arr.push(item);
            this.edit.name = '';
          }
          this.$message({
                type: 'success',
                message: '添加成功！'
            });
      }
  }
}
</script>
