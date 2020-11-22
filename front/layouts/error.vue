<template>
  <a-result :status="result.status" :title="result.title" :sub-title="result.subTitle">
    <template #extra>
      <nuxt-link to="/">
        <a-button class="active-button" type="primary">回到首页</a-button>
      </nuxt-link>
    </template>
  </a-result>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class Error extends Vue {
  @Prop({ type: Object, default: () => {} }) readonly error!: any;

  get result() {
    if (this.error.statusCode === 404) {
      return {
        status: '404',
        title: '资源不存在',
        subTitle: '',
      };
    }
    if (this.error.statusCode === 500) {
      return {
        status: '500',
        title: this.error.code === 'ECONNABORTED' ? '网络异常' : '系统繁忙',
        subTitle: '这可能不是您的原因造成的，请稍后重试',
      };
    }
    return {
      status: 'error',
      title: this.error.message || '系统繁忙',
      subTitle: '这可能不是您的原因造成的，请稍后重试',
    };
  }
}
</script>
