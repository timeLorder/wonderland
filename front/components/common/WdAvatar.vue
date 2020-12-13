<template>
  <a-dropdown placement="bottomCenter">
    <a-avatar :src="avatar" size="large" />
    <a-menu slot="overlay">
      <a-menu-item>{{ username }}</a-menu-item>
      <a-menu-item>个人中心</a-menu-item>
      <a-menu-item @click="handleLogout">退出登录</a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { userStore } from '@/store';

@Component
export default class App extends Vue {
  get username() {
    return userStore.username;
  }

  get avatar() {
    return userStore.avatar;
  }

  async handleLogout() {
    await userStore.logout();
  }
}
</script>
