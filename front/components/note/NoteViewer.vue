<template>
  <div class="article-container">
    <a-skeleton v-if="loading" active />
    <template v-show="!loading">
      <div class="article-cover-container">
        <img v-if="article.cover" class="article-cover" :src="article.cover" alt="封面" />
      </div>
      <h2 class="article-title">{{ article.title }}</h2>
      <div class="article-info">
        <span>最后更新于 {{ updateTime }}</span>
        <span>阅读量 {{ article.readTimes }}</span>
      </div>
      <tui-viewer :initial-value="article.content" height="auto" @load="handleLoad" />
    </template>
  </div>
</template>

<script lang="ts">
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import dayjs from 'dayjs';

interface ArticleType {
  articleId?: string;
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

  get updateTime() {
    return dayjs(this.article.updatedAt).format('YYYY-MM-DD');
  }

  handleLoad() {
    this.loading = false;
  }
}
</script>

<style lang="less" scoped>
.article-container {
  padding: 32px;
  width: 100%;
  background: #fff;
}
.article-cover-container {
  margin-bottom: 32px;
  width: 100%;
  text-align: center;
}
.article-cover {
  max-width: 762px;
}
.article-title {
  font-size: 28px;
  color: #222;
  margin-bottom: 14px;
  font-weight: 700;
  line-height: 1.4;
}
.article-info {
  margin-bottom: 30px;
  color: #9b9b9b;
  font-size: 12px;
  font-weight: 400;

  & > span {
    margin-right: 12px;
  }
}
</style>
