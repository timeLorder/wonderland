<template>
  <span class="wd-logo" :class="{ 'wd-logo-clickable': clickable }" @click="goHome">
    Wonderland
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    goHome() {
      if (this.clickable) {
        this.$router.push('/');
      }
    },
  },
});
</script>

<style lang="less">
.wd-logo {
  font-size: 20px;
  color: green;

  &.wd-logo-clickable {
    cursor: pointer;
  }
}
</style>
