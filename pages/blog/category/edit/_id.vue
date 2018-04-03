<template>
    <category-view :type="type" :title="title" :label="label" :tag="tag"></category-view>
</template>
<script>
import Category from '~/components/blog/categoryTag.vue';
export default {
    name: 'BlogCategoryDetails',
    validate ({ params }) {
        return params.id.length === 24
    },
    fetch ({ store, params }) {
        return store.dispatch('blog/category/find', params)
    },
    data() {
        return {
            type: 2,
            title: '编辑',
            label: '分类',
            tag: 'category'
        }
    },
    components: {
        CategoryView: Category
    }
}
</script>
