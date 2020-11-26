<template>
  <main class="wd-entries-wrapper">
    <div class="wd-entries">
      <index-entry type="explore" title="探索一下" />
      <index-entry type="note" title="记录一下" />
      <index-entry type="focus" title="专注一下" />
      <index-entry type="relax" title="放松一下" />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="less">
body {
  background: @neumorphism-bg;
}
.wd-entries-wrapper {
  width: @index-width;
  margin: 40px auto;

  .wd-entries {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
