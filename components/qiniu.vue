<template>
    <div>
    <el-card>
        <el-button type="success" class="button" size="mini" @click="createFile">上传资源</el-button>
        <el-button type="primary" class="button" size="mini" @click="dirVisible = true">新建文件夹</el-button>
        <div class="ddp-cd">
            <label for="#">当前目录：</label>
                <span @click="openDir('')" class="on">根目录</span>
                <span v-for="(item, index) in cdArr" :key="index" @click="openDir(item.cd)" :class="{on: index != cdArr.length - 1}">/&nbsp;{{item.name}} </span>
        </div>
    </el-card>
    <ul class="ddp-row">
        <li v-for="item in dir" :key="item" class="ddp-dir">
             <el-card :body-style="{padding: '0px'}">
            <img src="~/static/images/qn/dir.png" class="image">
            <div class="info-box">
                <h4>{{item | rearDirVal}}</h4>
                <div class="bottom">
                <el-button type="primary" class="button" size="mini" @click="openDir(item)">点击进入</el-button>
                </div>
            </div>
            </el-card>
        </li>
        <li v-for="(item, index) in list" :key="index">
             <el-card :body-style="{padding: '0px'}">
            <img :src="`${$logc.qnUrl}/${item.key}`" class="image" v-if="ifType(item.mimeType, 'image')" @click="onImgBd">
            <img src="~/static/images/qn/js.png" class="image" v-else-if="ifType(item.mimeType, 'javascript')">
            <img src="~/static/images/qn/css.png" class="image" v-else-if="ifType(item.mimeType, 'css')">
            <img src="~/static/images/qn/res.png" class="image" v-else>
            <div class="info-box">
                <h4>{{item.key | rearVal}}</h4>
                <p class="time">{{ item.putTime | toLocalString }}</p>
                <div class="bottom">
                <el-button type="success" class="button ddp-copy" size="mini" :data-clipboard-text="`${$logc.qnUrl}/${item.key}`" ref="share_copy_btn" >复制链接</el-button>
                <el-button type="danger" class="button" size="mini" @click="delRes(item)">删除文件</el-button>
                </div>
            </div>
            </el-card>
        </li>
    </ul>
    <el-dialog
  title="创建文件夹"
  :visible.sync="dirVisible"
  :width="$store.state.option.mobileLayout? '90%':'30%'"
  append-to-body>
  <el-input v-model="dirname" placeholder="请输入文件夹名称"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dirVisible = false">取 消</el-button>
    <el-button type="primary" @click="createDir">确 定</el-button>
  </span>
</el-dialog>
    </div>


</template>
<script>
import Clipboard from 'clipboard';
export default {
  data() {
    return {
        // list: [],
        // dir: [],
        cd: '',
        cdArr: [],
        dirVisible: false,
        dirname: ''
    };
  },
  computed: {
      list() {
          return this.$store.state.thirdparty.qiniu.data.list
      },
      dir() {
          return JSON.parse(JSON.stringify(this.$store.state.thirdparty.qiniu.data.dir))
      }
  },
  async mounted () {
      const clipboard = new Clipboard('.ddp-copy');
      clipboard.on('success', e => {
         this.$message({
                type: 'success',
                message: '复制成功！'
            });
        });
      let res = await this.initList();
  },
  methods: {
    createFile() {
        let file = document.createElement('input');
        file.type = 'file';
        file.onchange = this.fileUpload;
        file.click();
    },
    createDir() {
        let name = this.$logc.noSpace(this.dirname);
        if(!name){
            return false;
        }
        const regSrc = '[\&\=\,\:\"\!\*\^\%\$\#\@\!\{\}\;\'\`\~\+\/]';
        const reg = new RegExp(regSrc);
        if(reg.test(name)){
            return this.$notify({
            title: '警告',
            message: `上命名失败，原因文件夹包含了${regSrc}特殊字符`,
            type: 'warning'
        });
        }
        name = this.cd + name + '/';
        if(this.dir.indexOf(name) != '-1'){
            return this.$notify({
                title: '警告',
                message: `在同级目录该文件夹名已重复,请重新命名!`,
                type: 'warning'
            });
        }
          this.dir.push(name);
         this.$notify({
                title: '成功',
                message: '新建成功！',
                type: 'success'
            });
        this.dirVisible = false;
    },
    async fileUpload(e) {
        const file = e.target.files[0];
        // /[\&\=\,\:\"\!\*\^\%\$\#\@\!\(\)\{\}\;\'\`\~\+]/
        const regSrc = '[\&\=\,\:\"\!\*\^\%\$\#\@\!\(\)\{\}\;\'\`\~\+]';
        const reg = new RegExp(regSrc);
        if(reg.test(file.name)){
            return this.$notify({
            title: '警告',
            message: `上传失败，原因文件名包含了${regSrc}特殊字符`,
            type: 'warning'
        });
        }
        let token = await this.$store.dispatch(`thirdparty/qiniu/uptoken`, {});
        if(token.data && token.data.code === 2){
            return this.$notify({
            title: '错误',
            message: token.data.message,
            type: 'error'
        });
        }
        token = token.data.result;
        let formData = new FormData();
        formData.append('file', file);
        formData.append('token', token);
        formData.append('key', this.cd + file.name);
        const loading = this.$loading(this.$store.state.option.loadingStyle);
        let res = await this.$http.post('http://upload.qiniup.com/', formData);
        loading.close();
        if(res.data && res !== 0){
             this.$notify({
                title: '成功',
                message: '上传成功！',
                type: 'success'
            });
            return this.initList();
        }else{
            let errParm;
            try {
                errParm = JSON.parse(JSON.stringify(res.data));
            } catch (error) {
                    errParm = {
                        status: 0,
                        message: '上传失败！'
                    }
            }
            if(errParm.status === 614){
                errParm.message = '同一个区域出现相同文件名！'
            }
            this.$notify({
                title: '错误',
                message: `状态码：${errParm.status} ${errParm.message}`,
                type: 'error'
            });
        }
    },
    async delRes(item) {
        this.$confirm(`选中的文件:${item.key} 确定删除?`, {
        title: '警告',
        type: 'warning',
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(async _ => {
          let res = await this.$store.dispatch(`thirdparty/qiniu/del`, {filename: item.key});
    //    let res = await this.$axios.get(`/thirdparty/qiniu/delete?filename=${item.key}`);
        if(res.data && res.data.code !== 0){
            return this.initList();
        }
      }).catch(_ => {});
    },
    ifType(typebox, type) {
        return (typebox || '').indexOf(type) != '-1'
    },
    async initList () {
        let res = await this.$store.dispatch(`thirdparty/qiniu/lists`, {prefix: this.cd});
        if(res.data && res.data.code !== 0){
            return this.eachCdArr();
        }
    },
    eachCdArr(){
        const cds = this.cd.split('/');
        this.cdArr = [];
        let tmpsrc = '';
        for(let i = 0; i < cds.length; i++){
            if(!cds[i]){
                return;
            }
            tmpsrc += `${cds[i]}/`;
            this.cdArr.push({
                name: cds[i],
                cd: tmpsrc
            })
        }
    },
    openDir(dir) {
        if(dir == this.cd){
            return false;
        }
        this.cd = dir;
        return this.initList();
    }
  },
  filters: {
      rearVal(val) {
          val = (val || '').split('/');
          return val[val.length - 1]
      },
      rearDirVal(val){
          val = (val || '').split('/');
          return val[val.length - 2]
      }
  }
}
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';
  .el-card{
      margin-bottom: 20px;
  }
  .ddp-row{
    li{
        float: left;
        width: 215px;
        margin-right: 40px;
    }
    &:after {
        content: '';
        clear: both;
        display: table;
    }
  }
    h4{
        margin-bottom: 10px;
        height: 20px;
        @include text-overflow()
    }
  .time {
    font-size: 13px;
    color: #999;
    display: block;
       margin-bottom: 10px;
    @include text-overflow()
  }
  .image {
    width: 100%;
    height: 135px;
    display: block;
  }
  .el-col{
      margin-bottom: 15px;
  }
  .info-box{
      padding: 14px 5px;
  }
 .bottom{
     text-align: center;
 }
  .ddp-dir{
        h4{
            margin-top: 10px;
            text-align: center;
        }
        .bottom{
            padding-top: 7px;
        }
        .el-button{
            width: 100%;
            height: 38px;
        }
  }
  .ddp-cd{
      label{
          color: #999;
      }
      margin-top: 15px;
      span{
          margin-left: 5px;
          cursor: pointer;
          font-weight: bold;
          color: #999;
          &.on{
              color: #000;
              &:hover{
                  color: #409eff;
              }
          }
      }
  }
  
</style>
