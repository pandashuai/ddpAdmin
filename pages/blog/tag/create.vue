<template>
   <tag-view :type="type" :title="title" :label="label" :tag="tag"></tag-view>
</template>

<script>
import Tag from '~/components/blog/categoryTag.vue';
export default {
  name: 'BlogTagCreate',
  fetch ({ store, params }) {
      return store.commit('blog/tag/GET_ITEM_LIST_FAILURE')
  },
  data() {
    return {
      type: 1,
      title: '创建',
      label: '标签',
      tag: 'tag'
    };
  },
  components: {
    TagView: Tag
  }
};
</script>