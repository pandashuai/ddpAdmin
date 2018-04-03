<template>
  <node-box :type="type" :title="title"></node-box>
</template>
<script>
import NodeBox from '~/components/rbac/node.vue';
export default {
  name: 'NodeCreate',
    fetch ({ store, params }) {
        return store.commit('rbac/node/GET_ITEM_LIST_FAILURE')
    },
  data() {
    return {
      type: 1,
      title: '创建权限'
    };
  },
  components: {
    NodeBox
  }
};
</script>
