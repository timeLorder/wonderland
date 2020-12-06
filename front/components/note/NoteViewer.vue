<template>
  <div class="article-container">
    <a-skeleton v-if="loading" active />
    <template v-show="!loading">
      <h2>{{ article.title }}</h2>
      <tui-viewer :initial-value="article.content" height="auto" @load="handleLoad" />
    </template>
  </div>
</template>

<script lang="ts">
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Vue, Component, Prop } from 'nuxt-property-decorator';

interface ArticleType {
  _id?: string;
  title?: string;
  cover?: string;
  content?: string;
  readTimes?: number;
  updatedAt?: string;
}

@Component({
  components: {
    TuiViewer: () => import('@toast-ui/vue-editor').then(res => res.Viewer),
  },
})
export default class App extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly article!: ArticleType;

  loading = true;

  handleLoad() {
    this.loading = false;
  }
}
</script>

<style lang="less" scoped>
.article-container {
  width: 100%;
  background: #fff;
}
</style>
