<template>
  <a-row>
    <a-col :span="18">
      <note-viewer v-if="showViewer" :article="article" />
    </a-col>
    <a-col :span="5" :offset="1">
      <author-card v-if="!isMe" :author="article.author" />
      <div class="directory-placeholder">大纲占位</div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';

@Component
export default class App extends Vue {
  showViewer = false;

  async asyncData({ app, params, store }: Context) {
    try {
      const { data } = await app.$axios.get(`/article/detail?id=${params.id}`);
      return { article: data, isMe: data?.author?.authorId === store.state.user.userid };
    } catch (error) {
      return { article: {}, isMe: true };
    }
  }

  mounted() {
    this.showViewer = true;
  }
}
</script>

<style lang="less" scoped>
.directory-placeholder {
  height: 200px;
  line-height: 200px;
  background-color: white;
  text-align: center;
}
</style>
