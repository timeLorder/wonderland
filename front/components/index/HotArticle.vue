<template>
  <div class="article-card" @click="jumpInto">
    <a-row>
      <a-col :span="cover ? 18 : 24">
        <h4 class="title">{{ title }}</h4>
        <p v-if="desc" class="desc">{{ desc }}</p>
        <div class="info-row">
          <div>
            <a-avatar :src="avatar" size="small" />
            <span class="username">{{ author.username }}</span>
          </div>
          <div class="fromNow">4小时前</div>
        </div>
      </a-col>
      <a-col v-if="!!cover" :span="6"></a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { defaultAvatar } from '@/constants';

interface Authorinfo {
  _id?: string;
  username?: string;
  avatar?: string;
}

@Component
export default class App extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string;
  @Prop({ type: Object, default: () => ({}) }) readonly author!: Authorinfo;
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: String, default: '' }) readonly desc!: string;
  @Prop({ type: String, default: '' }) readonly cover!: string;
  @Prop({ type: String, required: true }) readonly updatedAt!: string;

  get avatar() {
    return this.author.avatar || defaultAvatar;
  }

  jumpInto() {
    this.$router.push(`/note/view/${this.id}`);
  }
}
</script>

<style lang="less" scoped>
.article-card {
  position: relative;
  padding: 16px 20px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }

  .title {
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: rgba(38, 38, 38, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  }

  .desc {
    font-size: 14px;
    line-height: 20px;
    color: rgba(60, 60, 67, 0.6);
    line-clamp: 2;
    overflow: hidden;
    margin: 16px 0 18px;
  }

  .info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .username {
      margin-left: 8px;
      color: #b2bac2;
    }

    .fromNow {
      font-size: 12px;
      line-height: 18px;
      color: #b2bac2;
    }
  }
}
</style>
