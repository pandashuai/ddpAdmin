<template>
   <tag-view :type="type" :title="title" :label="label" :tag="tag"></tag-view>
</template>
<script>
import Tag from '~/components/blog/categoryTag.vue';
export default {
    name: 'BlogTagDetails',
    validate ({ params }) {
        return params.id.length === 24
    },
    fetch ({ store, params }) {
        return store.dispatch('blog/tag/find', params)
    },
    data() {
        return {
            type: 2,
            title: '编辑',
            label: '标签',
            tag: 'tag'
        }
    },
    components: {
        TagView: Tag
    }
}
</script>
