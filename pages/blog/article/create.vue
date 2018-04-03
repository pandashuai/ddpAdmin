<template>
 <article-box :title="title" :type="type"></article-box>
</template>
<script>
import ArticleBox from '~/components/blog/article.vue'
export default {
  name: 'BlogArticleCreate',
    fetch ({ store, params }) {
        return store.commit('blog/article/GET_ITEM_LIST_FAILURE')
    },
  data() {
    return {
      type: 0,
      title: '发布文章'
    }
  },
  components: {
    ArticleBox
  }
}
</script>