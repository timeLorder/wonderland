<template>
  <a-row>
    <a-col :span="18">
      <a-row class="index-entries" type="flex" justify="space-between">
        <a-col :span="5">
          <index-entry type="explore" title="探索一下" />
        </a-col>
        <a-col :span="5">
          <index-entry type="note" title="记录一下" path="/note/edit" />
        </a-col>
        <a-col :span="5">
          <index-entry type="focus" title="专注一下" />
        </a-col>
        <a-col :span="5">
          <index-entry type="relax" title="放松一下" />
        </a-col>
      </a-row>
      <div
        v-infinite-scroll="handleInfiniteOnLoad"
        class="hot-content"
        :infinite-scroll-disabled="false"
        :infinite-scroll-distance="10"
      >
        <a-list :data-source="hotList">
          <a-list-item slot="renderItem" slot-scope="item">
            <hot-article
              :id="item._id"
              :title="item.title"
              :author="item.author"
              :updated-at="item.updatedAt"
            />
          </a-list-item>
        </a-list>
      </div>
    </a-col>
    <a-col :span="5" :offset="1">右侧占位</a-col>
  </a-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class App extends Vue {
  landTime = Date.now();
  current = 1;
  hotList = [];

  async fetchData() {
    const oldList = this.hotList;
    try {
      const { data } = await this.$axios.get('/article/getHotList', {
        params: { current: this.current, landTime: this.landTime },
      });
      this.current = this.current + 1;
      this.hotList = oldList.concat(data?.list || []);
    } catch (error) {}
  }

  async fetch() {
    await this.fetchData();
  }

  async handleInfiniteOnLoad() {
    await this.fetchData();
  }
}
</script>

<style lang="less" scoped>
.index-entries {
  margin-bottom: 20px;
}
.hot-content {
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.1);

  /deep/ .ant-list-item {
    border-bottom: 1px solid #f0f0f0;
    padding: 0;

    &:last-child {
      border-radius: 0 0 12px 12px;
    }
  }
}
</style>
