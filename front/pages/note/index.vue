<template>
  <div>
    <wd-header>
      <template v-slot:center>
        <edit-status />
      </template>
      <template v-slot:right>
        <a-space size="middle">
          <edit-action />
          <wd-auth />
        </a-space>
      </template>
    </wd-header>
    <note-editor />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  layout: 'blank',
});
</script>
