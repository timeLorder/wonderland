<template>
  <main class="note-view-wrapper">
    <a-row>
      <a-col :span="18">
        <div class="article-container"></div>
      </a-col>
      <a-col :span="5" :offset="1">
        <author-card user="x" />
      </a-col>
    </a-row>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class App extends Vue {
  private isSubmiting = false;
}
</script>

<style lang="less" scoped>
.note-view-wrapper {
  width: @index-width;
  margin: 40px auto;

  .article-container {
    width: 100%;
    background: #fff;
  }
}
</style>