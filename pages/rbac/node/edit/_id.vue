<template>
  <node-box :type="type" :title="title"></node-box>
</template>
<script>
import NodeBox from '~/components/rbac/node.vue';
export default {
  name: 'NodeDetails',
   validate ({ params }) {
        return params.id.length === 24
    },
    fetch ({ store, params }) {
        return store.dispatch('rbac/node/find', params)
    },
  data() {
    return{
      type: 2,
      title: '编辑用户'
    };
  },
  components: {
    NodeBox
  }
};
</script>
