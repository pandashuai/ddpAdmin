<template>
  <category-view :type="type" :title="title" :label="label" :tag="tag"></category-view>
</template>

<script>
import Category from '~/components/blog/categoryTag.vue';
export default {
  name: 'BlogCategoryCreate',
  fetch ({ store, params }) {
      return store.commit('blog/category/GET_ITEM_LIST_FAILURE')
  },
  data() {
    return {
      type: 1,
      title: '创建',
      label: '分类',
      tag: 'category'
    };
  },
  components: {
    CategoryView: Category
  }
};
</script>