<template>
  <header class="wd-header">
    <Logo :clickable="clickable" />
    <a-input-search
      v-if="showSearch"
      v-model="searchText"
      class="wd-header-search"
      placeholder="请输入"
    >
      <template v-slot:enterButton>
        <a-button icon="search" />
      </template>
    </a-input-search>
    <Avatar v-if="isLogin" />
    <a-button v-else class="active-button" @click="handleLogin">登录</a-button>
    <Auth />
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { commonStore, userStore } from '@/store';

@Component
export default class Header extends Vue {
  private clickable = this.$route.path !== '/';
  private showSearch = this.$route.path !== '/';
  private searchText = '';

  get isLogin() {
    return userStore.isLogin;
  }

  handleLogin() {
    commonStore.openAuthModal();
  }
}
</script>

<style lang="less">
.wd-header {
  margin: 0 auto;
  padding: 12px 0;
  width: @index-width;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .wd-header-search {
    margin: 0 10px;
    width: 500px;
  }
}
</style>
