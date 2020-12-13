<template>
  <main class="note-view-wrapper">
    <a-row>
      <a-col :span="18">
        <note-viewer v-if="showViewer" :article="article" />
      </a-col>
      <a-col :span="5" :offset="1">
        <author-card :author="article.author" />
      </a-col>
    </a-row>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';

@Component
export default class App extends Vue {
  showViewer = false;

  async asyncData({ app, params }: Context) {
    try {
      const { data } = await app.$axios.get(`/article/detail?id=${params.id}`);
      return { article: data };
    } catch (error) {
      return { article: {} };
    }
  }

  mounted() {
    this.showViewer = true;
  }
}
</script>

<style lang="less" scoped>
.note-view-wrapper {
  width: @index-width;
  margin: 40px auto;
}
</style>
