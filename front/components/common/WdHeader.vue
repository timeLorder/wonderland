<template>
  <header class="wd-header" :class="headerClass">
    <wd-logo :clickable="clickable" />
    <slot name="center">
      <a-input-search
        v-if="showSearch"
        v-model="searchText"
        class="wd-header-search"
        placeholder="请输入"
      >
        <template v-slot:enterButton>
          <a-button icon="search" />
        </template>
      </a-input-search>
    </slot>
    <slot name="right"><wd-auth /></slot>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';

@Component
export default class App extends Vue {
  @Prop({ type: Boolean, default: false }) readonly full!: boolean;

  private clickable = this.$route.path !== '/';
  private showSearch = this.$route.path !== '/';
  private searchText = '';

  get headerClass() {
    return {
      'wd-header-full': this.full,
    };
  }

  @Watch('$route')
  onRouteChanged() {
    this.clickable = this.$route.path !== '/';
    this.showSearch = this.$route.path !== '/';
  }
}
</script>

<style lang="less">
.wd-header {
  margin: 0 auto;
  padding: 12px 0;
  width: @index-width;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .wd-header-search {
    margin: 0 10px;
    width: 500px;
  }

  &.wd-header-full {
    width: 100%;
    padding: 12px 40px;
  }
}
</style>
