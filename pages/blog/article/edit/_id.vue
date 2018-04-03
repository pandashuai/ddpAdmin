<template>
 <article-box :title="title" :type="type"></article-box>
</template>
<script>
import ArticleBox from '~/components/blog/article.vue'
export default {
  name: 'BlogArticleDetails',
   validate ({ params }) {
        return params.id.length === 24
    },
    fetch ({ store, params }) {
        return store.dispatch('blog/article/find', params)
    },
  data() {
    return{
      type: 1,
      title: '编辑文章'
    }
  },
  components: {
    ArticleBox
  }
}
</script>