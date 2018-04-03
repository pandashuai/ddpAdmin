<template>
  <user-box :type="type" :title="title"></user-box>
</template>
<script>
import UserBox from '~/components/rbac/user.vue';
export default {
  name: 'UserCreate',
  fetch ({ store, params }) {
      return store.commit('rbac/user/GET_ITEM_LIST_FAILURE', {})
  },
  data() {
    return {
      type: 1,
      title: '创建用户'
    };
  },
  components: {
    UserBox
  }
};
</script>
