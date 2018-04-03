<template>
  <user-box :type="type" :title="title"></user-box>
</template>
<script>
import UserBox from '~/components/rbac/user.vue';
export default {
  name: 'UserCreate',
   validate ({ params }) {
        return params.id.length === 24
    },
    fetch ({ store, params }) {
        return store.dispatch('rbac/user/find', params)
    },
  data() {
    return{
      type: 2,
      title: '编辑用户'
    };
  },
  components: {
    UserBox
  }
};
</script>
