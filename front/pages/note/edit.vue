<template>
  <div>
    <wd-header full>
      <template #center>
        <edit-status />
      </template>
      <template #right>
        <a-space size="middle">
          <edit-action :is-submiting="isSubmiting" @submit="handleSubmit" />
          <wd-auth />
        </a-space>
      </template>
    </wd-header>
    <note-editor ref="note-editor" height="calc(100vh - 60px)" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';
import NoteEditor from '@/components/note/NoteEditor.vue';

@Component({
  layout: 'blank',
})
export default class App extends Vue {
  @Ref('note-editor') readonly noteEditor!: NoteEditor;

  private isSubmiting = false;

  async handleSubmit(formData: any) {
    const article = this.noteEditor.getContent();
    const data = {
      ...formData,
      ...article,
    };

    this.isSubmiting = true;
    await this.$axios.post('/private/article/publish', data);
    this.isSubmiting = false;
    // todo 路由权限控制
    // this.$router.push('/');
  }
}
</script>
