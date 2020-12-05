<template>
  <a-card hoverable class="author-card">
    <template slot="actions" class="ant-card-actions">
      <a-icon key="setting" type="setting" />
      <a-icon key="edit" type="edit" />
      <a-icon key="ellipsis" type="ellipsis" />
    </template>
    <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

interface Userinfo {
  name?: string;
  avatar?: string;
  watched?: number;
  watchedBy?: number;
}

@Component
export default class App extends Vue {
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop({ type: Boolean, default: false }) readonly hasFollowed!: boolean;
  @Prop({ type: Object, required: true }) readonly user!: Userinfo;
}
</script>

<style lang="less" scoped>
.author-card {
  width: 100%;
}
</style>
