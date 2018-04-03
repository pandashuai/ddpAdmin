<template>
    <category-list :title="title" :tag="tag" :perPage="perPage" :currentPage="currentPage"></category-list>
</template>

<script>
import CategoryList from '~/components/blog/categoryTagList.vue';
const pageParam = {
    currentPage: 1,
    perPage: 5
  };
export default {
    name: 'blogTagList',
    fetch ({ store }) {
        return store.dispatch('blog/category/lists', {
            page: pageParam.currentPage,
            per_page: pageParam.perPage
        })
    },
    data() {
        return {
            title: '分类',
            tag: 'category',
            currentPage: pageParam.currentPage,
            perPage: pageParam.perPage
        }
    },
    components: {
        CategoryList
    }
}
</script>