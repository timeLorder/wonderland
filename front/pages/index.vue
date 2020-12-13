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
      <div class="hot-content">
        <hot-article
          v-for="item in hotList"
          :id="item.id"
          :key="item.id"
          :title="item.title"
          :author="item.author"
          :update-at="item.updateAt"
        />
      </div>
    </a-col>
    <a-col :span="5" :offset="1">右侧占位</a-col>
  </a-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';

const test = [
  {
    id: 'xsnxjsnj',
    title: '才弄上今年才是你家农村垃圾',
    updateAt: '19987908208',
    author: {
      id: 'xscscswe2e2323',
      username: 'omg',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    },
  },
  {
    id: 'xsnxjs2',
    title: '才弄上今年才是',
    updateAt: '19987908208',
    author: {
      id: 'xscscswe2e2323',
      username: 'omg',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    },
  },
  {
    id: 'xsnx2323',
    title: '才弄上今年才是你家农村垃圾才弄上今年才是你家农村垃圾',
    updateAt: '19987908208',
    author: {
      id: 'xscscswe2e2323',
      username: 'omg',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    },
  },
];

@Component
export default class App extends Vue {
  async asyncData() {
    return { hotList: test };
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
}
</style>
