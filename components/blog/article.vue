<template>
  <div>
    <h2 class="ddp-title">{{title}}</h2>
     <el-form ref="form" :model="form" label-width="80px">
       <el-form-item label="所属分类">
         <el-tag
          v-for="category in form.category"
          :key="category.name"
          closable
          @close="handleClose(form.category, category)">
          {{category.name}} 
        </el-tag> 
        <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary">
              请选择<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  v-for="category in categorys" :key="category.name" :command="{arr: form.category, val: category}" :disabled="onDisabled(form.category, category)">{{category.name}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown> 
        <el-button type="info" icon="el-icon-plus" title="添加分类" class="addl3" @click="addCT('category')"></el-button>
       </el-form-item>
    <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="标题"></el-input>
      </el-form-item>
        <el-form-item label="关键字">
        <el-input v-model="keywords" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item label="文章描述">
        <el-input v-model="form.description" placeholder="文章描述"></el-input>
      </el-form-item>
      <el-form-item label="缩略图" :inline="true">
        <el-col :span="10">
          <el-input v-model="form.thumb" placeholder="缩略图链接"></el-input>
        </el-col>
         <el-col :span="1">&nbsp;</el-col>
         <el-col :span="6">
          <el-button type="primary" @click="qiniuBoxVisible = true">选择</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="内容">
        <div class="ddp-editor" :class="{fullscreen: isFull}">
          <div class="ddp-markdown">
            <div class="markdown-editor" 
                 ref="markdown"
                 contenteditable="true"
                 placeholder="说点什么吧..."
                 @keyup="commentContentChange($event)">
            </div>
            <div class="markdown-preview" 
                 :class="{ actived: markdown.previewMode }"
                 v-html="markdown.previewContent"></div>
          </div>
          <div class="editor-tools">
            <a href="" class="emoji" title="emoji" @click.stop.prevent>
              <i class="iconfont icon-emoji"></i>
              <div class="emoji-box">
                <ul class="emoji-list">
                  <li class="item" @click="insertEmoji(e)" :key="index" v-for="(e, index) in markdown.emojis">{{ e }}</li>
                </ul>
              </div>
            </a>
            <a href="" class="image" title="image" @click.stop.prevent="insertContent('image')">
              <i class="iconfont icon-image"></i>
            </a>
            <a href="" class="link" title="link" @click.stop.prevent="insertContent('link')">
              <i class="iconfont icon-link-horizontal"></i>
            </a>
            <a href="" class="code" title="code" @click.stop.prevent="insertContent('code')">
              <i class="iconfont icon-code-comment"></i>
            </a>
            <a href="" class="preview" title="preview" @click.stop.prevent="togglePreviewMode">
              <i class="iconfont icon-eye"></i>
            </a>
            <a href="" class="preview" :title="!isFull?'全屏':'退出全屏'" @click.stop.prevent="isFull=!isFull">
              <i class="iconfont icon-fullscreen"></i>
            </a>
          </div>
        </div>
       
      </el-form-item>
        <el-form-item label="所属标签">
         <el-tag
          v-for="tag in form.tag"
          :key="tag.name"
          closable
          @close="handleClose(form.tag, tag)">
          {{tag.name}} 
        </el-tag> 
        <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary">
              请选择<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  v-for="tag in tags" :key="tag.name" :command="{arr: form.tag, val: tag}" :disabled="onDisabled(form.tag, tag)">{{tag.name}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button type="info" icon="el-icon-plus" title="添加标签" class="addl3" @click="addCT('tag')"></el-button>
       </el-form-item>
        
      <el-form-item label="发布状态">
        <el-radio-group v-model="form.state" fill="#f56c6c">
          <el-radio-button :label="-1" >回收站</el-radio-button>
          <el-radio-button :label="0" >草稿</el-radio-button>
          <el-radio-button :label="1" >已发布</el-radio-button>
        </el-radio-group>
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
        <el-button type="primary" @click="onSubmit('form')" v-if="type === 0">立即创建</el-button>
        <el-button type="primary" @click="onUpdate('form')" v-if="type === 1">更新文章</el-button>
        <el-button type="info" @click="addExtend()" v-if="form.extends.length == 0">创建扩展</el-button>
      </el-form-item>
     </el-form>
    <el-dialog
      title="提示"
      :visible.sync="qiniuBoxVisible"
      :width="$store.state.option.mobileLayout?'95%':'60%'">
      <qiniu-box></qiniu-box>
    </el-dialog>
    <el-dialog
      :visible.sync="ctparam.visible"
      :width="$store.state.option.mobileLayout?'95%':'70%'">
      <category-tag :type="ctparam.type" :title="ctparam.title" :label="ctparam.label" :tag="ctparam.tag" :reload="true"></category-tag>
    </el-dialog>
  </div>
</template>
<script>
import marked from '~/plugins/marked';
import QiniuBox from '~/components/qiniu.vue';
import CategoryTag from '~/components/blog/categoryTag.vue';
export default {
  name: 'BlogArticleM',
    mounted() {
        this.$store.dispatch('blog/category/lists');
        this.$store.dispatch('blog/tag/lists');
        this.$refs.markdown.innerText = this.form.content;
        this.commentContentChange()
    },
   data() {
    return {
      isFull: false,
      form: JSON.parse(JSON.stringify(this.$store.state.blog.article.current)),
      markdown: {
        previewContent: '',
        comemntContentHtml: '',
        previewMode: false,
        comemntContentText: '',
        emojis: ['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😭', '😱', '😳', '😵', '🙏', '👆', '👇', '👌', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊', '🇨🇳', '🇺🇸']
      },
      uptoken: '',
      fileList2: [],
      qiniuBoxVisible: false,
      // 分类标签
      ctparam: {
        visible: false,
        type: 1,
        title: '创建',
        label: '',
        tag: ''
      }
    }
  },
  components: {
    QiniuBox,
    CategoryTag
  },
  props: {
      type: Number,
      title: String
  },
  computed: {
    categorys(){
      return this.$store.state.blog.category.data.data
    },
    tags(){
      return this.$store.state.blog.tag.data.data
    },
    keywords: {
      get() {
        return this.form.keywords.join(',')
      },
      set(newval) {
        this.form.keywords = this.$logc.noSpace(newval).split(',')
      }
    }
  },
  methods: {
    addCT(type) {
      this.$store.commit(`blog/${type}/GET_ITEM_LIST_FAILURE`);
      this.ctparam.tag = type;
      if(type == 'tag'){
        this.ctparam.label = '标签';
      }else if(type === 'category'){
        this.ctparam.label = '分类';
      }
      this.ctparam.visible = true;
      return false;
    },
    async onSubmit(formName) {
      this.form.content = this.markdown.comemntContentText;
      if(!this.form.title || !this.form.content || !this.form.thumb || this.form.category.lenght <= 0){
         return this.$notify.error({
            title: '错误',
            message: `[标题|内容|缩略图|分类]不允许为空!`
          });
      }
       let res = await this.$store.dispatch('blog/article/create', this.form);
        if(res.data && res.data.code !== 0){
          this.form = JSON.parse(JSON.stringify(this.$store.state.blog.article.current))
          this.$refs.markdown.innerText = '';
          this.markdown.comemntContentText = '';
        }
    },
    async onUpdate(formName) {
      this.form.content = this.markdown.comemntContentText;
      if(!this.form._id){
         return this.$notify.error({
          title: '错误',
          message: `不能编辑，该文章已不存在!`
        });
      }
      if(!this.form.title || !this.form.content || !this.form.thumb || this.form.category.lenght <= 0){
         return this.$notify.error({
            title: '错误',
            message: `[标题|内容|缩略图|分类]不允许为空!`
          });
      }
      this.form.update_at && delete this.form.update_at
      let res = await this.$store.dispatch('blog/article/edit', this.form);
    },
    onDisabled(arr, itme) {
      return arr.indexOf(itme) != '-1'
    },
    handleCommand(data) {
      if(data.arr.indexOf(data.val) == '-1'){
        data.arr.push(data.val)
      }
    },
    handleClose(arr, item) {
      return arr.splice(arr.indexOf(item), 1);
    },
        // 编辑器相关
      commentContentChange() {
        const html = this.$refs.markdown.innerHTML
        const text = this.$refs.markdown.innerText
        if (!Object.is(html, this.markdown.comemntContentHtml)) {
          this.markdown.comemntContentHtml = html
        }
        if (!Object.is(text, this.markdown.comemntContentText)) {
          this.markdown.comemntContentText = text
        }
      },
      insertEmoji(emoji) {
        this.updateCommentContent({ end: emoji })
      },
      insertContent(type) {
        const contents = {
          image: {
            start: `![`,
            end: `]()`
          },
          link: {
            start: `[`,
            end: `]()`
          },
          code: {
            start: '\n```\n',
            end: '\n```'
          }
        }
        this.updateCommentContent(contents[type])
      },
      updateCommentContent({ start = '', end = '' }) {
        if (!start && !end) return false
        // 如果选中了内容，则把选中的内容替换，否则在光标位置插入新内容
        const selectedText = (window.getSelection || document.getSelection)().toString()
        const currentText = this.$refs.markdown.innerText
        if (!!selectedText) {
          const newText = currentText.replace(selectedText, start + selectedText + end)
          this.$refs.markdown.innerText = newText
        } else {
          this.$refs.markdown.innerText = this.$refs.markdown.innerText += (start + end)
          this.$refs.markdown.scrollTop = this.$refs.markdown.scrollHeight
        }
        this.commentContentChange()
      },
      // 切换预览模式
      togglePreviewMode() {
        this.markdown.previewContent = this.marked(this.markdown.comemntContentText)
        this.markdown.previewMode = !this.markdown.previewMode
      },
      // markdown解析服务
      marked(content) {
        return marked(content, null, false)
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
  }
}
</script>

<style lang="scss">
.el-tag{
  margin-right: 5px;
}
.addl3{
  margin-left: 5px;
}
</style>
