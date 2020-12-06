<template>
  <a-card hoverable class="author-card" :loading="loading">
    <template v-if="!loading" slot="actions" class="ant-card-actions">
      <a-button class="text-button" type="link" icon="star">关注</a-button>
      <a-button class="text-button" type="link" icon="message" disabled>发消息</a-button>
    </template>
    <a-avatar :src="avatar" />
    <b class="username">{{ author.username }}</b>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { defaultAvatar } from '@/constants';

interface Userinfo {
  _id?: string;
  username?: string;
  avatar?: string;
  watched?: number;
  watchedBy?: number;
}

@Component
export default class App extends Vue {
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop({ type: Boolean, default: false }) readonly hasFollowed!: boolean;
  @Prop({ type: Object, default: () => ({}) }) readonly author!: Userinfo;

  get avatar() {
    return this.author.avatar || defaultAvatar;
  }
}
</script>

<style lang="less" scoped>
.author-card {
  width: 100%;

  .username {
    margin-left: 10px;
  }
}
</style>
