<template>
  <a-card hoverable class="author-card" :loading="loading">
    <template v-if="!loading" slot="actions" class="ant-card-actions">
      <a-button v-if="!hasFollowed" class="text-button" type="link" @click="follow">
        <a-icon type="star" />关注
      </a-button>
      <a-button v-else class="text-button" type="link" @click="unfollow">
        <a-icon type="star" theme="filled" />已关注
      </a-button>
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
  authorId?: string;
  username?: string;
  avatar?: string;
  hasFollowed?: boolean;
}

@Component
export default class App extends Vue {
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop({ type: Object, default: () => ({}) }) readonly author!: Userinfo;

  hasFollowed = false;

  get avatar() {
    return this.author.avatar || defaultAvatar;
  }

  mounted() {
    this.hasFollowed = this.author.hasFollowed || false;
  }

  async follow() {
    try {
      await this.$axios.put('/user/switchFollow', {
        type: 'FOLLOW',
        targetId: this.author.authorId,
      });
      this.hasFollowed = true;
    } catch (error) {}
  }

  async unfollow() {
    try {
      await this.$axios.put('/user/switchFollow', {
        type: 'UNFOLLOW',
        targetId: this.author.authorId,
      });
      this.hasFollowed = false;
    } catch (error) {}
  }
}
</script>

<style lang="less" scoped>
.author-card {
  width: 100%;
  margin-bottom: 40px;

  .username {
    margin-left: 10px;
  }
}
</style>
