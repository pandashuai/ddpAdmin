<template>
    <tag-list :title="title" :tag="tag" :perPage="perPage" :currentPage="currentPage"></tag-list>
</template>

<script>
import TagList from '~/components/blog/categoryTagList.vue';
const pageParam = {
    currentPage: 1,
    perPage: 5
  };
export default {
    name: 'blogTagList',
    fetch ({ store }) {
        return store.dispatch('blog/tag/lists', {
            page: pageParam.currentPage,
            per_page: pageParam.perPage
        })
    },
    data() {
        return {
            title: '标签',
            tag: 'tag',
            currentPage: pageParam.currentPage,
            perPage: pageParam.perPage
        }
    },
    components: {
        TagList
    }
}
</script>