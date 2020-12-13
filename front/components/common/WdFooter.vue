<template>
  <footer class="wd-footer">footer</footer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style>
.wd-footer {
  margin: 0 auto;
  padding: 12px 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
